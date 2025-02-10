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
	secretarias?: Secretaria[];
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
	{
		title: '2. Deferidos',
		value: 880,
		color: '#1e40af',
		secretarias: [
			{
				title: 'SMUL',
				value: 321,
				sectors: [
					{ title: 'RESID', value: 86 },
					{ title: 'PARHIS', value: 215 },
					{ title: 'SERVIN', value: 9 },
					{ title: 'COMIN', value: 7 },
					{ title: 'CAEPP', value: 4 },
				],
			},
			{
				title: 'GRAPROEM',
				value: 559,
				sectors: [
					{ title: 'RESID', value: 229 },
					{ title: 'PARHIS', value: 302 },
					{ title: 'SERVIN', value: 21 },
					{ title: 'COMIN', value: 7 },
					{ title: 'CAEPP', value: 0 },
				],
			},
		],
	},
	{
		title: '3. Indeferidos',
		value: 93,
		color: '#60a5fa',
		secretarias: [
			{
				title: 'SMUL',
				value: 28,
				sectors: [
					{ title: 'RESID', value: 6 },
					{ title: 'PARHIS', value: 20 },
					{ title: 'SERVIN', value: 1 },
					{ title: 'COMIN', value: 1 },
					{ title: 'CAEPP', value: 0 },
				],
			},
			{
				title: 'GRAPROEM',
				value: 65,
				sectors: [
					{ title: 'RESID', value: 11 },
					{ title: 'PARHIS', value: 47 },
					{ title: 'SERVIN', value: 3 },
					{ title: 'COMIN', value: 4 },
					{ title: 'CAEPP', value: 0 },
				],
			},
		],
	},
	{
		title: '4. Via Ordinária a pedido do interessado',
		value: 13,
		color: '#a8a29e',
	},
];

export default function TableResumeSecretaria() {
	return (
		<Stack style={{ paddingBottom: '16px', paddingTop: '16px' }}>
			<TableContainer component={Paper}>
				<Table aria-label='simple table resume'>
					<TableHead style={{ background: '#00a1b9' }}>
						<TableRow style={{ background: '#00a1b9' }}>
							<TableCell style={{ color: '#fff', fontWeight: '700' }}>
								Status
							</TableCell>
							<TableCell
								align='center'
								style={{ color: '#fff', fontWeight: '700' }}>
								Valor Total Parcial
							</TableCell>
							<TableCell style={{ color: '#fff', fontWeight: '700' }}>
								Secretaria
							</TableCell>
							<TableCell
								align='center'
								style={{ color: '#fff', fontWeight: '700' }}>
								Valor Secretaria Parcial
							</TableCell>
							<TableCell style={{ color: '#fff', fontWeight: '700' }}>
								Setor
							</TableCell>
							<TableCell
								align='center'
								style={{ color: '#fff', fontWeight: '700' }}>
								Valor Setor Parcial
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{report.map((item, index) => {
							return item.secretarias ? (
								item.secretarias?.map((secretaria, secretariaIndex) => {
									return secretaria.sectors.map((sector, SectorIndex) => {
										return (
											<TableRow key={index + secretariaIndex + SectorIndex}>
												{SectorIndex == 0 && secretariaIndex == 0 && (
													<TableCell
														rowSpan={
															(secretaria.sectors.length ?? 1) *
															(item.secretarias?.length ?? 1)
														}
														style={{
															color: item.color,
															borderRight: '.5px solid #cacaca',
														}}>
														{item.title}
													</TableCell>
												)}
												{SectorIndex == 0 && secretariaIndex == 0 && (
													<TableCell
														align='center'
														rowSpan={
															(secretaria.sectors.length ?? 1) *
															(item.secretarias?.length ?? 1)
														}
														style={{
															color: item.color,
															borderRight: '.5px solid #cacaca',
														}}>
														{secretariaIndex == 0 &&
															SectorIndex == 0 &&
															item.value}
													</TableCell>
												)}
												{SectorIndex == 0 && (
													<TableCell
														rowSpan={secretaria.sectors.length}
														style={{
															color: item.color,
															borderRight: '.5px solid #cacaca',
														}}>
														{SectorIndex == 0 && secretaria.title}
													</TableCell>
												)}

												{SectorIndex == 0 && (
													<TableCell
														align='center'
														rowSpan={secretaria.sectors.length}
														style={{
															color: item.color,
															borderRight: '.5px solid #cacaca',
														}}>
														{SectorIndex == 0 && secretaria.value}
													</TableCell>
												)}
												<TableCell
													style={{
														color: item.color,
														borderRight: '.5px solid #cacaca',
													}}>
													{sector.title}
												</TableCell>
												<TableCell
													align='center'
													style={{ color: item.color }}>
													{sector.value}
												</TableCell>
											</TableRow>
										);
									});
								})
							) : (
								<TableRow key={index}>
									<TableCell
										colSpan={3}
										style={{
											color: item.color,
											borderRight: '.5px solid #cacaca',
										}}>
										{item.title}
									</TableCell>
									<TableCell
										align='center'
										colSpan={3}
										style={{
											color: item.color,
											borderRight: '.5px solid #cacaca',
										}}>
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
