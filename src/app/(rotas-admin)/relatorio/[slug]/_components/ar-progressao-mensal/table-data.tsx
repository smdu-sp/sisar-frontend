/** @format */

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';

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

const relatorio = {
	acumulado: 0,
	dados: [
		{
			ano: 2017,
			meses: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
		},
		{
			ano: 2018,
			meses: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
		},
		{
			ano: 2019,
			meses: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
		},
		{
			ano: 2020,
			meses: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
		},
		{
			ano: 2021,
			meses: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
		},
		{
			ano: 2022,
			meses: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
		},
		{
			ano: 2023,
			meses: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
		},
		{
			ano: 2024,
			meses: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
		},
	],
};

export default function TableData() {
	let totalAcumulado = relatorio.acumulado;
	return (
		<Grid
			spacing={{ xs: 0, sm: 2 }}
			style={{ paddingBottom: '16px' }}
			container>
			{relatorio.dados.map((ano, index) => {
				return (
					<Grid
						item
						xs={12}
						sm={6}
						key={index}
						style={{ paddingBottom: '16px' }}>
						<TableContainer component={Paper}>
							<Table
								aria-label='simple table'
								size='small'>
								<TableHead style={{ background: '#00a1b9' }}>
									<TableRow>
										<TableCell
											style={{ color: '#fff', fontWeight: '700' }}
											align='center'>
											Ano
										</TableCell>
										<TableCell
											style={{ color: '#fff', fontWeight: '700' }}
											align='center'>
											Mês
										</TableCell>
										<TableCell
											style={{ color: '#fff', fontWeight: '700' }}
											align='center'>
											Mensal
										</TableCell>
										<TableCell
											style={{ color: '#fff', fontWeight: '700' }}
											align='center'>
											Acumulado
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{ano.meses.map((mes, index) => {
										totalAcumulado += mes;
										return (
											<TableRow key={index}>
												{index === 0 && (
													<TableCell
														align='center'
														rowSpan={12}>
														{index === 0 && ano.ano}
													</TableCell>
												)}
												<TableCell align='center'>
													{arrayMeses[index]}
												</TableCell>
												<TableCell align='center'>{mes}</TableCell>
												<TableCell align='center'>{totalAcumulado}</TableCell>
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
