/** @format */

import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export interface ProcessoData {
	processo: string;
	dataProtocolo: string;
	dataPublicacao: string;
	dataPedidoReconsideracao?: string;
	dataPublicacaoReconsideracao?: string;
	tempoAnalise: number;
	tempoAnaliseReconsideracao?: number;
	suspensao?: string;
	motivoSuspensao?: string;
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
							processo: '6068.2024/0013603-8',
							dataProtocolo: '12/17/2024',
							dataPublicacao: '01/01/2025',
							dataPedidoReconsideracao: '07/01/2025',
							dataPublicacaoReconsideracao: '23/01/2025',
							tempoAnalise: 15,
							tempoAnaliseReconsideracao: 14,
						},
						{
							processo: '1010.2023/0008537-7',
							dataProtocolo: '12/17/2024',
							dataPublicacao: '01/02/2025',
							tempoAnalise: 15,
						},
						{
							processo: '6068.2024/0013603-8',
							dataProtocolo: '12/17/2024',
							dataPublicacao: '01/01/2025',
							dataPedidoReconsideracao: '07/01/2025',
							dataPublicacaoReconsideracao: '23/01/2025',
							tempoAnalise: 15,
							tempoAnaliseReconsideracao: 14,
						},
						{
							processo: '6068.2024/0013603-8',
							dataProtocolo: '12/17/2024',
							dataPublicacao: '01/01/2025',
							dataPedidoReconsideracao: '07/01/2025',
							dataPublicacaoReconsideracao: '23/01/2025',
							tempoAnalise: 15,
							tempoAnaliseReconsideracao: 14,
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
	'Nº Processo SIMPROC',
	'Data do Protocolo',
	'Data da Publicação',
	'Data de Pedido de Reconsideração',
	'Data da Publicação de Reconsideração',
	'Tempo de Análise de Admissibilidade 1ª Analise (dias)',
	'Tempo de Análise de Admissibilidade Reconsideração (dias)',
	'Suspensão do Prazo Durante a Análise (dias)',
	'Motivo da Suspensão do Prazo',
];

export default function TableRRAnaliseAdmissibilidade() {
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
															{processo.dataProtocolo}
														</TableCell>
														<TableCell
															style={{
																borderRight: '.5px solid #cacaca',
																fontSize: '12px',
															}}
															align='center'>
															{processo.dataPublicacao}
														</TableCell>
														<TableCell
															style={{
																borderRight: '.5px solid #cacaca',
																fontSize: '12px',
															}}
															align='center'>
															{processo.dataPedidoReconsideracao ?? '-'}
														</TableCell>
														<TableCell
															style={{
																borderRight: '.5px solid #cacaca',
																fontSize: '12px',
															}}
															align='center'>
															{processo.dataPublicacaoReconsideracao ?? '-'}
														</TableCell>
														<TableCell
															style={{
																borderRight: '.5px solid #cacaca',
																fontSize: '12px',
															}}
															align='center'>
															{processo.tempoAnalise ?? '-'}
														</TableCell>
														<TableCell
															style={{
																borderRight: '.5px solid #cacaca',
																fontSize: '12px',
																textWrap: 'nowrap',
															}}
															align='center'>
															{processo.tempoAnaliseReconsideracao ?? '-'}
														</TableCell>{' '}
														<TableCell
															style={{
																borderRight: '.5px solid #cacaca',
																fontSize: '12px',
																textWrap: 'nowrap',
															}}
															align='center'>
															{processo.suspensao ?? '-'}
														</TableCell>
														<TableCell
															style={{
																borderRight: '.5px solid #cacaca',
																fontSize: '12px',
																textWrap: 'nowrap',
															}}
															align='center'>
															{processo.motivoSuspensao ?? '-'}
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
