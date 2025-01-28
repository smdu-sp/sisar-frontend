/** @format */

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { mockDataTable as MockData } from '../_constants/mockdata';

function createData(
	ano: number,
	mes: string[],
	mensal: number[],
	acumilado: number[],
) {
	return { ano, mes, mensal, acumilado };
}

const rows = [
	createData(
		2018,
		[
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
		],
		[23, 27, 25, 32, 45, 44, 48, 36, 28, 29, 32, 35],
		[23, 27, 25, 32, 45, 44, 48, 36, 28, 29, 32, 35],
	),
	// createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	// createData('Eclair', 262, 16.0, 24, 6.0),
	// createData('Cupcake', 305, 3.7, 67, 4.3),
	// createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function TableRelatorio({
	data,
}: {
	data: (typeof MockData)[0];
}) {
	return (
		<TableContainer
			component={Paper}
			style={{ width: '490px' }}>
			<Table
				size='small'
				aria-label='simple table'
				style={{ border: '1px solid #242424' }}>
				<TableHead>
					<TableRow>
						<TableCell
							align='center'
							style={{ fontSize: 20 }}>
							Ano
						</TableCell>
						<TableCell
							align='center'
							style={{ fontSize: 20 }}>
							Mês
						</TableCell>
						<TableCell
							align='center'
							style={{ fontSize: 20 }}>
							Mensal
						</TableCell>
						<TableCell
							align='center'
							style={{ fontSize: 20 }}>
							Acumulado
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell
							align='center'
							style={{ fontSize: 20 }}
							component='th'
							scope='row'>
							{data.ano}
						</TableCell>
						<TableCell align='center'>
							{data.mes.map((item, index) => {
								return (
									<p
										style={{ fontSize: 14 }}
										key={index}>
										{item}
									</p>
								);
							})}
						</TableCell>
						<TableCell align='center'>
							{data.mensal.map((item, index) => {
								return (
									<p
										style={{ fontSize: 14 }}
										key={index}>
										{item}
									</p>
								);
							})}
						</TableCell>
						<TableCell align='center'>
							{data.acumulado.map((item, index) => {
								return (
									<p
										style={{ fontSize: 14 }}
										key={index}>
										{item}
									</p>
								);
							})}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
