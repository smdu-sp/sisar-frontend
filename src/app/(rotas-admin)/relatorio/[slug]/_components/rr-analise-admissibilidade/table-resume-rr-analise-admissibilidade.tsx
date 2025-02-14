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

interface TableResumeProps {
	label: string;
	value: number;
	color: string;
}

const resume: TableResumeProps[] = [
	{
		label: 'QUANTIDADE DE PROCESSOS COM ANÁLISE DE ADMISSIBILIDADE FINALIZADA',
		value: 24,
		color: 'black',
	},
	{
		label:
			'QUANTIDADE DE PROCESSOS COM ANÁLISE DE ADMISSIBILIDADE DENTRO DO PRAZO',
		value: 24,
		color: 'black',
	},
	{
		label:
			'QUANTIDADE DE PROCESSOS COM TEMPO DE ANÁLISE DE ADMISSIBILIDADE EXCEDIDO',
		value: 0,
		color: 'red',
	},
	{
		label: 'MEDIANA DO TEMPO DE ANÁLISE DE ADMISSIBILIDADE',
		value: 13,
		color: '#1e40af',
	},
];

export default function TableResumeRRAnaliseAdmissibilidade() {
	return (
		<Stack style={{ paddingBottom: '16px', paddingTop: '16px' }}>
			<TableContainer
				style={{ maxWidth: 'fit-content' }}
				component={Paper}>
				<Table
					size='small'
					aria-label='simple table resume'>
					<TableHead style={{ background: '#00a1b9' }}>
						<TableRow style={{ background: '#00a1b9' }}>
							<TableCell style={{ color: '#fff', fontWeight: '700' }}>
								Status
							</TableCell>
							<TableCell style={{ color: '#fff', fontWeight: '700' }}>
								Quantidade
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{resume.map((item, index) => {
							return (
								<TableRow key={index}>
									<TableCell
										style={{
											color: item.color,
											borderRight: '.5px solid #cacaca',
											fontSize: '16px',
										}}>
										{item.label}
									</TableCell>
									<TableCell
										style={{ fontSize: '16px', color: item.color }}
										align='center'>
										{item.value}
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
