/** @format */

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { mockDataTable } from '../constants/mockdata';

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number,
) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function TableData({
	data,
}: {
	data: (typeof mockDataTable)[0];
}) {
	return (
		<TableContainer component={Paper}>
			<Table
				aria-label='simple table'
				size='small'>
				<TableHead>
					<TableRow>
						<TableCell align='center'>Ano</TableCell>
						<TableCell align='center'>Mês</TableCell>
						<TableCell align='center'>Mensal</TableCell>
						<TableCell align='center'>Acumulado</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow
						key={data?.ano}
						style={{ width: 'fit-content' }}>
						<TableCell
							align='center'
							style={{ fontSize: '16px' }}>
							{data?.ano}
						</TableCell>
						<TableCell>
							{data?.mes?.map((item, index) => {
								return (
									<TableCell
										key={index}
										style={{
											fontSize: '11px',
											display: 'flex',
											flexDirection: 'column',
											gap: '0px',
										}}
										align='center'>
										{item}
									</TableCell>
								);
							})}
						</TableCell>
						<TableCell>
							{data?.mensal?.map((item, index) => {
								return (
									<TableCell
										key={index}
										style={{
											fontSize: '11px',
											display: 'flex',
											flexDirection: 'column',
											gap: '0px',
										}}
										align='center'>
										{item}
									</TableCell>
								);
							})}
						</TableCell>
						<TableCell>
							{data?.acumulado?.map((item, index) => {
								return (
									<TableCell
										key={index}
										style={{
											fontSize: '11px',
											display: 'flex',
											flexDirection: 'column',
											gap: '0px',
										}}
										align='center'>
										{item}
									</TableCell>
								);
							})}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
