/** @format */

import {
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import React from 'react';

interface TableProcessosProps {
	processo: string;
	migracao: string | null;
	descricao: string;
	color: string;
}

const relatorio: TableProcessosProps[] = [
	{
		processo: '2018-0.035.189-1',
		color: 'red',
		migracao: null,
		descricao:
			'ARQUIVO GERAL – considerado Inadmissível (razão: não cumprimento de requisito para pedido conjunto de Aprovação e Execução) e encaminhado a RESID para exclusão do procedimento e prosseguimento da análise via ordinária;',
	},
	{
		processo: '2018-0.036.309-1',
		color: '#1e40af',
		migracao: null,
		descricao:
			'ARQUIVO GERAL - considerado Admissível e encaminhado a RESID para continuidade da análise. Deferido em 04/07/2018;',
	},
	{
		processo: '2018-0.008.368-4',
		color: '#1e40af',
		migracao: null,
		descricao:
			'ARQUIVO GERAL – considerado Admissível e encaminhado a PARHIS e demais Secretarias que compõem o GRAPROEM para análise. Após Reunião do dia 20/06/2018, foi elaborado comunique-se único, publicado em 22/07/2018, ao qual o interessado apresentou documentos complementares. Após nova reunião do GRAPROEM, realizada em 05/09/2018, o processo foi considerado passível de aceitação, tendo sido encaminhado a SMUL/PARHIS para Despacho Decisório. Deferido em 15/09/2018;',
	},
	{
		processo: '2018-0.017.759-0',
		color: 'red',
		migracao: null,
		descricao:
			'ARQUIVO GERAL – considerado Inadmissível (razão: ausência de documentos) e encaminhado a PARHIS para exclusão do procedimento e prosseguimento da análise via ordinária;',
	},
	{
		processo: '2018-0.045.042-3',
		color: 'red',
		migracao: null,
		descricao:
			'ARQUIVO GERAL – considerado Inadmissível (razão: ausência de documentos) e encaminhado a RESID para exclusão do procedimento e prosseguimento da análise via ordinária;',
	},
	{
		processo: '2018-0.098.536-0',
		color: '#60a5fa',
		migracao: null,
		descricao:
			'ARQUIVO GERAL - considerado Admissível e encaminhado a PARHIS e demais Secretarias que compõem o GRAPROEM para análise. Após Reunião do dia 28/11/2018, o processo foi considerado passível de indeferimento e encaminhado a PARHIS para Despacho Decisório. Indeferido em 04/12/2018. Após Reunião realizada em 13/02/2019, para análise do pedido de reconsideração, foi elaborado comunique-se único, publicado em 18/02/2019, ao qual o interessado apresentou documentos complementares. Após segunda Reunião para análise do pedido de reconsideração, realizada em 24/04/2019, o processo foi considerado passível de indeferimento e encaminhado a PARHIS para Despacho Decisório. Indeferido em 03/05/2019;',
	},
	{
		processo: '6068.2020/0002751-7',
		color: '#22c55e',
		migracao: null,
		descricao:
			'Considerado Admissível e encaminhado a PARHIS para continuidade da análise. Atualmente, o processo eletrônico encontra-se em SMUL/PARHIS/DHGP, desde 15/03/2024;',
	},
];
export default function TableProcessosAR() {
	return (
		<Stack style={{ paddingBottom: '16px', paddingTop: '16px' }}>
			<TableContainer component={Paper}>
				<Table aria-label='simple table resume'>
					<TableHead style={{ background: '#00a1b9' }}>
						<TableRow style={{ background: '#00a1b9' }}>
							<TableCell style={{ color: '#fff', fontWeight: '700' }}>
								Processo
							</TableCell>
							<TableCell
								align='center'
								style={{ color: '#fff', fontWeight: '700' }}>
								Migração
							</TableCell>
							<TableCell
								align='center'
								style={{ color: '#fff', fontWeight: '700' }}>
								Descrição e Status
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{relatorio.map((item, index) => {
							return (
								<TableRow key={index}>
									<TableCell
										style={{
											color: item.color,
											borderRight: '.5px solid #cacaca',
											textWrap: 'nowrap',
										}}>
										{item.processo}
									</TableCell>

									<TableCell
										align='center'
										style={{
											color: item.color,
											borderRight: '.5px solid #cacaca',
										}}>
										{item.migracao ?? '-'}
									</TableCell>

									<TableCell
										style={{
											color: item.color,
											borderRight: '.5px solid #cacaca',
										}}>
										{item.descricao ?? '-'}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
}
