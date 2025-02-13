/** @format */

import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const arrayMeses = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro',
];

export interface ProcessoData {
	processo: string;
	tipoDeUso: string;
	subprefeitura: string;
	tempoInicial: number;
	tempoRecurso: number;
	tempoSegundoRecurso: number;
	descricao: string;
}

export interface IMes {
	mes: string;
	processos?: ProcessoData[];
}
export interface IAno {
	ano: number;
	meses: IMes[];
}

export interface IRelatorioAnual {
	anos: IAno[];
}

const relatorio: IRelatorioAnual = {
	anos: [
		{
			ano: 2025,
			meses: [
				{
					mes: 'Janeiro',
					processos: [
						{
							processo: '1010.2023/0008537-7',
							tipoDeUso: 'NR1.03',
							subprefeitura: 'Santana',
							tempoInicial: 461,
							tempoRecurso: 0,
							tempoSegundoRecurso: 0,
							descricao: '1 prédio de 3 andares, 1 unidade',
						},
						{
							processo: '1010.2023/0008684-5',
							tipoDeUso: 'NR1.15',
							subprefeitura: 'Ipiranga',
							tempoInicial: 120,
							tempoRecurso: 0,
							tempoSegundoRecurso: 0,
							descricao: '1 prédio com 2 andares, 1 unidade, 1 subsolo',
						},
						{
							processo: '6068.2024/0005560-7',
							tipoDeUso: 'EHMP',
							subprefeitura: 'Santo Amaro',
							tempoInicial: 140,
							tempoRecurso: 0,
							tempoSegundoRecurso: 0,
							descricao: '1 prédio com 26 andares, 210 unidades, 1 subsolo',
						},
						{
							processo: '6068.2024/0007715-5',
							tipoDeUso: 'EHIS',
							subprefeitura: 'Cidade Ademar',
							tempoInicial: 121,
							tempoRecurso: 0,
							tempoSegundoRecurso: 0,
							descricao: '1 prédio com 18 andares, 84 unidades',
						},
					],
				},
				{ mes: 'Fevereiro' },
			],
		},
	],
};

const headerTable = [
	'Ano',
	'Mês',
	'Nº Processo',
	'Tipo de Uso',
	'Subprefeitura',
	'Tempo de Análise Pedido Inicial (dias)',
	'Tempo de Análise de Recurso (dias)',
	'Tempo de Análise de 2º Recurso (dias)',
	'Característica do Projeto',
];

export default function TableARProcessosAprovados() {
	return (
		<Grid
			style={{ paddingBottom: '16px', paddingTop: '16px' }}
			container>
			{relatorio.anos.map((ano, indexRelatorio) => {
				return (
					<Grid
						item
						key={indexRelatorio}
						style={{ paddingBottom: '16px' }}>
						<TableContainer component={Paper}>
							<Table
								aria-label='simple table'
								size='small'>
								<TableHead style={{ background: '#00a1b9', color: 'white' }}>
									<TableRow>
										{headerTable.map((item, index) => {
											return (
												<TableCell
													style={{ fontWeight: 'bold', color: 'white' }}
													align='center'
													key={index}>
													{item}
												</TableCell>
											);
										})}
									</TableRow>
								</TableHead>
								<TableBody>
									{ano.meses.map((mes, indexMes: number) => {
										const totalRegistros = ano.meses.reduce(
											(acc, mes) =>
												acc +
												(mes.processos && mes.processos.length > 0
													? mes.processos.length
													: 1),
											0,
										);
										return mes.processos && mes.processos.length > 0 ? (
											mes.processos.map((processo, indexProcesso) => {
												return (
													<TableRow key={`${indexMes}-${indexProcesso}`}>
														{indexMes === 0 && indexProcesso === 0 && (
															<TableCell
																style={{
																	borderRight: '.5px solid #cacaca',
																	fontWeight: 'bold',
																	fontSize: '16px',
																}}
																align='center'
																rowSpan={totalRegistros}>
																{ano.ano}
															</TableCell>
														)}
														{indexProcesso === 0 && (
															<TableCell
																style={{
																	borderRight: '.5px solid #cacaca',
																	fontSize: '12px',
																}}
																align='center'
																rowSpan={mes.processos?.length}>
																{mes.mes}
															</TableCell>
														)}

														<TableCell
															style={{
																borderRight: '.5px solid #cacaca',
																fontSize: '12px',
																textWrap: 'nowrap',
															}}
															align='center'>
															{processo.processo}
														</TableCell>
														<TableCell
															style={{
																borderRight: '.5px solid #cacaca',
																fontSize: '12px',
															}}
															align='center'>
															{processo.tipoDeUso}
														</TableCell>
														<TableCell
															style={{
																borderRight: '.5px solid #cacaca',
																fontSize: '12px',
															}}
															align='center'>
															{processo.subprefeitura}
														</TableCell>
														<TableCell
															style={{
																borderRight: '.5px solid #cacaca',
																fontSize: '12px',
															}}
															align='center'>
															{processo.tempoInicial}
														</TableCell>
														<TableCell
															style={{
																borderRight: '.5px solid #cacaca',
																fontSize: '12px',
															}}
															align='center'>
															{processo.tempoRecurso}
														</TableCell>
														<TableCell
															style={{
																borderRight: '.5px solid #cacaca',
																fontSize: '12px',
															}}
															align='center'>
															{processo.tempoSegundoRecurso}
														</TableCell>
														<TableCell
															style={{
																borderRight: '.5px solid #cacaca',
																fontSize: '12px',
																textWrap: 'nowrap',
															}}
															align='center'>
															{processo.descricao}
														</TableCell>
													</TableRow>
												);
											})
										) : (
											<TableRow key={`${indexMes}-0`}>
												{indexMes === 0 && (
													<TableCell
														style={{
															borderRight: '.5px solid #cacaca',
															fontWeight: 'bold',
															fontSize: '16px',
														}}
														align='center'
														rowSpan={totalRegistros}>
														{ano.ano}
													</TableCell>
												)}
												<TableCell
													style={{
														borderRight: '.5px solid #cacaca',
														fontSize: '12px',
													}}
													align='center'>
													{mes.mes}
												</TableCell>
												<TableCell
													style={{
														borderRight: '.5px solid #cacaca',
														fontSize: '12px',
													}}
													align='center'>
													-
												</TableCell>
												<TableCell
													style={{
														borderRight: '.5px solid #cacaca',
														fontSize: '12px',
													}}
													align='center'>
													-
												</TableCell>
												<TableCell
													style={{
														borderRight: '.5px solid #cacaca',
														fontSize: '12px',
													}}
													align='center'>
													-
												</TableCell>
												<TableCell
													style={{
														borderRight: '.5px solid #cacaca',
														fontSize: '12px',
													}}
													align='center'>
													-
												</TableCell>
												<TableCell
													style={{
														borderRight: '.5px solid #cacaca',
														fontSize: '12px',
													}}
													align='center'>
													-
												</TableCell>
												<TableCell
													style={{
														borderRight: '.5px solid #cacaca',
														fontSize: '12px',
													}}
													align='center'>
													-
												</TableCell>
												<TableCell
													style={{
														borderRight: '.5px solid #cacaca',
														fontSize: '12px',
													}}
													align='center'>
													-
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				);
			})}
		</Grid>
	);
}
