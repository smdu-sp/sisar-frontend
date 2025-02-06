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
	{ label: 'Total de Processos', value: 1767, color: 'black' },
	{ label: 'Análise de Admissibilidade', value: 9, color: 'orange' },
	{ label: 'Inadmissíveis', value: 698, color: 'red' },
	{ label: 'Admissíveis', value: 1060, color: 'purple' },
];

export default function TableResume() {
	return (
		<Stack style={{ paddingBottom: '16px', paddingTop: '16px' }}>
			<TableContainer
				style={{ maxWidth: 'fit-content' }}
				component={Paper}>
				<Table aria-label='simple table resume'>
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
										style={{ fontSize: '16px' }}
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
