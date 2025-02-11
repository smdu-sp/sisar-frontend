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
	valueNaoIncide: number;
	valueAreaEnvoltoria: number;
	valueBemTombado: number;
}

interface Secretaria {
	title: string;
	value: number;
	sectors: Sector[];
}

interface TableResumeSecretariaProps {
	title: string;
	valueNaoIncide: number;
	valueAreaEnvoltoria: number;
	valueBemTombado: number;
	color: string;
	secretarias?: Secretaria[];
}

const report: TableResumeSecretariaProps[] = [
	{
		title: '1. Em Análise',
		valueNaoIncide: 44,
		valueAreaEnvoltoria: 20,
		valueBemTombado: 90,
		color: '#22c55e',
		secretarias: [
			{
				title: 'SMUL',
				value: 18,
				sectors: [
					{
						title: 'RESID',
						valueNaoIncide: 1,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'PARHIS',
						valueNaoIncide: 14,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'SERVIN',
						valueNaoIncide: 0,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'COMIN',
						valueNaoIncide: 0,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'CAEPP',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
				],
			},
			{
				title: 'GRAPROEM',
				value: 56,
				sectors: [
					{
						title: 'RESID',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'PARHIS',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'SERVIN',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'COMIN',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'CAEPP',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
				],
			},
		],
	},
	{
		title: '2. Deferidos',
		valueNaoIncide: 74,
		valueAreaEnvoltoria: 30,
		valueBemTombado: 20,
		color: '#1e40af',
		secretarias: [
			{
				title: 'SMUL',
				value: 321,
				sectors: [
					{
						title: 'RESID',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'PARHIS',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'SERVIN',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'COMIN',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'CAEPP',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
				],
			},
			{
				title: 'GRAPROEM',
				value: 559,
				sectors: [
					{
						title: 'RESID',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'PARHIS',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'SERVIN',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'COMIN',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'CAEPP',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
				],
			},
		],
	},
	{
		title: '3. Indeferidos',
		valueNaoIncide: 72,
		valueAreaEnvoltoria: 68,
		valueBemTombado: 35,
		color: '#60a5fa',
		secretarias: [
			{
				title: 'SMUL',
				value: 28,
				sectors: [
					{
						title: 'RESID',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'PARHIS',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'SERVIN',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'COMIN',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'CAEPP',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
				],
			},
			{
				title: 'GRAPROEM',
				value: 65,
				sectors: [
					{
						title: 'RESID',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'PARHIS',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'SERVIN',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'COMIN',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
					{
						title: 'CAEPP',
						valueNaoIncide: 3,
						valueAreaEnvoltoria: 3,
						valueBemTombado: 0,
					},
				],
			},
		],
	},
	{
		title: '4. Via ordinária a pedido do interessado',
		valueNaoIncide: 34,
		valueAreaEnvoltoria: 50,
		valueBemTombado: 99,
		color: '#a8a29e',
	},
];

export default function TableResumoQuantitativo() {
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
								Não Incide
							</TableCell>
							<TableCell
								align='center'
								style={{ color: '#fff', fontWeight: '700' }}>
								Área Envoltória
							</TableCell>
							<TableCell
								align='center'
								style={{ color: '#fff', fontWeight: '700' }}>
								Bem Tombado
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
														{item.valueNaoIncide +
															item.valueAreaEnvoltoria +
															item.valueBemTombado}
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
													style={{
														color: item.color,
														borderRight: '.5px solid #cacaca',
													}}>
													{sector.valueNaoIncide}
												</TableCell>{' '}
												<TableCell
													align='center'
													style={{
														color: item.color,
														borderRight: '.5px solid #cacaca',
													}}>
													{sector.valueAreaEnvoltoria}
												</TableCell>
												<TableCell
													align='center'
													style={{
														color: item.color,
													}}>
													{sector.valueBemTombado}
												</TableCell>
											</TableRow>
										);
									});
								})
							) : (
								<TableRow key={index}>
									<TableCell
										colSpan={5}
										style={{
											color: item.color,
											borderRight: '.5px solid #cacaca',
										}}>
										{item.title}
									</TableCell>
									<TableCell
										align='center'
										style={{
											color: item.color,
											borderRight: '.5px solid #cacaca',
										}}>
										{item.valueNaoIncide}
									</TableCell>
									<TableCell
										align='center'
										style={{
											color: item.color,
											borderRight: '.5px solid #cacaca',
										}}>
										{item.valueAreaEnvoltoria}
									</TableCell>
									<TableCell
										align='center'
										style={{
											color: item.color,
											borderRight: '.5px solid #cacaca',
										}}>
										{item.valueBemTombado}
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
