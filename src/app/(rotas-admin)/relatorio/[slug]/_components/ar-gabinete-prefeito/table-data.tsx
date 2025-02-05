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

export interface IProcessoAprovado {
	numProcesso: number;
	tempoAnaliseInicial: number;
	tempoAnaliseRecurso?: number;
	categoriaUso: string;
	responsavelProjeto: string;
	empresa: string;
	carecteristicasProjeto?: string;
	regiaoCidade: string;
}

export interface IMes {
	mes: string;
	processosProtocolados: number;
	processosAprovados: IProcessoAprovado[];
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
			ano: 2018,
			meses: [
				{
					mes: 'Janeiro',
					processosProtocolados: 40,
					processosAprovados: [
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487794,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 45,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'EZEIS',
							empresa: 'Merc Engenharia E Arquitetura Ltda',
							numProcesso: 201800487999,
							regiaoCidade: 'Zona Norte',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 90,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'R2v / nR1 (Residencial)',
							empresa: 'Paes & Gregori LTDA',
							numProcesso: 201800487884,
							regiaoCidade: 'Zona Oeste',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 35,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
					],
				},
				{
					mes: 'Fevereiro',
					processosProtocolados: 40,
					processosAprovados: [
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487774,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 36,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
					],
				},
				{
					mes: 'Março',
					processosProtocolados: 40,
					processosAprovados: [],
				},
				{
					mes: 'Abril',
					processosProtocolados: 40,
					processosAprovados: [
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487664,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 56,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
					],
				},
				{
					mes: 'Maio',
					processosProtocolados: 40,
					processosAprovados: [
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487739,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 66,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
					],
				},
				{
					mes: 'Junho',
					processosProtocolados: 40,
					processosAprovados: [
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487738,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 76,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
					],
				},
				{
					mes: 'Julho',
					processosProtocolados: 40,
					processosAprovados: [
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487724,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 80,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
					],
				},
				{
					mes: 'Agosto',
					processosProtocolados: 40,
					processosAprovados: [
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487754,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 81,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
					],
				},
				{
					mes: 'Setembro',
					processosProtocolados: 40,
					processosAprovados: [
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487734,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 82,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
					],
				},
				{
					mes: 'Outubro',
					processosProtocolados: 40,
					processosAprovados: [
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487744,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 83,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
					],
				},
				{
					mes: 'Novembro',
					processosProtocolados: 40,
					processosAprovados: [],
				},
				{
					mes: 'Dezembro',
					processosProtocolados: 40,
					processosAprovados: [
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
						{
							categoriaUso: 'HMP',
							empresa: 'Idea Empreendimentos Spe 10 Ltda',
							numProcesso: 201800487784,
							regiaoCidade: 'Zona Sul',
							responsavelProjeto: 'Marcelo Saicaly Zapparoli',
							tempoAnaliseInicial: 85,
							tempoAnaliseRecurso: 8,
							carecteristicasProjeto: '1 prédio com 2 andares e 1 subsolo',
						},
					],
				},
			],
		},
	],
};

const headerTable = [
	'Ano',
	'Mês',
	'Processos Protocolados Aprova Rápido',
	'Processos Aprovados',
	'Nº Processo',
	'Tempo de Análise Pedido Inicial',
	'Tempo de Análise de Recurso',
	'Categoria de Uso',
	'Responsável Pelo Projeto',
	'Empresa',
	'Característica do Projeto',
	'Região da Cidade',
];

export default function TableData() {
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
										<TableCell align='center'>Ano</TableCell>
										<TableCell align='center'>Mês</TableCell>
										<TableCell align='center'>Processos Protocolados</TableCell>
										<TableCell align='center'>Processos Aprovados</TableCell>
										<TableCell align='center'>Num. Processo</TableCell>
										<TableCell align='center'>Tempo de Análise Inicial</TableCell>
										<TableCell align='center'>Tempo de Análise de Recurso</TableCell>
										<TableCell align='center'>Categoria de Uso</TableCell>
										<TableCell align='center'>Responsável pelo Projeto</TableCell>
										<TableCell align='center'>Empresa</TableCell>
										<TableCell align='center'>Características do Projeto</TableCell>
										<TableCell align='center'>Região</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{ano.meses.map((mes, indexMes: number) => {
										const totalRegistros = ano.meses.reduce((acc, mes) => acc + (mes.processosAprovados && mes.processosAprovados.length > 0 ? mes.processosAprovados.length : 1), 0);
										return mes.processosAprovados && mes.processosAprovados.length > 0 ? mes.processosAprovados.map((processo, indexProcesso) => {
											return <TableRow key={`${indexMes}-${indexProcesso}`}>
												{indexMes === 0 && indexProcesso === 0 && <TableCell align='center' rowSpan={totalRegistros}>{ano.ano}</TableCell>}
												{indexProcesso === 0 && <TableCell align='center' rowSpan={mes.processosAprovados.length}>{mes.mes}</TableCell>}
												{indexProcesso === 0 && <TableCell align='center' rowSpan={mes.processosAprovados.length}>{mes.processosProtocolados}</TableCell>}
												{indexProcesso === 0 && <TableCell align='center' rowSpan={mes.processosAprovados.length}>{mes.processosAprovados.length}</TableCell>}
												<TableCell align='center'>{processo.numProcesso}</TableCell>
												<TableCell align='center'>{processo.tempoAnaliseInicial}</TableCell>
												<TableCell align='center'>{processo.tempoAnaliseRecurso}</TableCell>
												<TableCell align='center'>{processo.categoriaUso}</TableCell>
												<TableCell align='center'>{processo.responsavelProjeto}</TableCell>
												<TableCell align='center'>{processo.empresa}</TableCell>
												<TableCell align='center'>{processo.carecteristicasProjeto}</TableCell>
												<TableCell align='center'>{processo.regiaoCidade}</TableCell>
											</TableRow>
										}) : <TableRow key={`${indexMes}-0`}>
											{indexMes === 0 && <TableCell align='center' rowSpan={totalRegistros}>{ano.ano}</TableCell>}
											<TableCell align='center'>{mes.mes}</TableCell>
											<TableCell align='center'>{mes.processosProtocolados}</TableCell>
											<TableCell align='center'>-</TableCell>
											<TableCell align='center'>-</TableCell>
											<TableCell align='center'>-</TableCell>
											<TableCell align='center'>-</TableCell>
											<TableCell align='center'>-</TableCell>
											<TableCell align='center'>-</TableCell>
											<TableCell align='center'>-</TableCell>
											<TableCell align='center'>-</TableCell>
											<TableCell align='center'>-</TableCell>
										</TableRow>
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
