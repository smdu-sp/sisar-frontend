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

interface Sector {
	title: string;
	value: number;
}

interface Secretaria {
	title: string;
	value: number;
	sectors: Sector[];
}

interface TableResumeSecretariaProps {
	title: string;
	value: number;
	color: string;
	secretarias: Secretaria[];
}

const report: TableResumeSecretariaProps[] = [
	{
		title: '1. Em Análise',
		value: 74,
		color: '#22c55e',
		secretarias: [
			{
				title: 'SMUL',
				value: 18,
				sectors: [
					{ title: 'RESID', value: 1 },
					{ title: 'PARHIS', value: 14 },
					{ title: 'SERVIN', value: 0 },
					{ title: 'COMIN', value: 0 },
					{ title: 'CAEPP', value: 3 },
				],
			},
			{
				title: 'GRAPROEM',
				value: 56,
				sectors: [
					{ title: 'RESID', value: 1 },
					{ title: 'PARHIS', value: 14 },
					{ title: 'SERVIN', value: 0 },
					{ title: 'COMIN', value: 0 },
					{ title: 'CAEPP', value: 3 },
				],
			},
		],
	},
];

export default function TableResumeSecretaria() {
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
								Secretaria
							</TableCell>
							<TableCell style={{ color: '#fff', fontWeight: '700' }}>
								Total
							</TableCell>
							<TableCell style={{ color: '#fff', fontWeight: '700' }}>
								Setor
							</TableCell>
							<TableCell style={{ color: '#fff', fontWeight: '700' }}>
								Total
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{report.map((item, index) => {
							return item.secretarias.map((secretaria, secretariaIndex) => {
								return secretaria.sectors.map((sector, SectorIndex) => {
									return (
										index == 0 && (
											<TableRow key={index + secretariaIndex + SectorIndex}>
												<TableCell style={{ color: item.color }}>
													{secretariaIndex == 0 &&
														SectorIndex == 0 &&
														item.title}
												</TableCell>
												<TableCell style={{ color: item.color }}>
													{SectorIndex == 0 && secretaria.title}
												</TableCell>
												<TableCell style={{ color: item.color }}>
													{SectorIndex == 0 && secretaria.value}
												</TableCell>
												<TableCell style={{ color: item.color }}>
													{sector.title}
												</TableCell>
												<TableCell style={{ color: item.color }}>
													{sector.value}
												</TableCell>
											</TableRow>
										)
									);
								});
							});
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
}
