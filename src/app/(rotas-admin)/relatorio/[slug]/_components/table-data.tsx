/** @format */

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { mockDataTable } from '../_constants/mockdata';

function createDadosAnuais(
	ano: number,
	mes: string[],
	mensal: number[],
	acumulado: number[],
) {
	return { ano, mes, mensal, acumulado };
}

const dadosAnuais = [
	createDadosAnuais(
		2017,
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
		[47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
		[31, 38, 36, 35, 29, 38, 46, 25, 29, 45, 44, 38],
	),
];

export default function TableData() {
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
					{dadosAnuais?.map((item, index) => {
						return (
							<TableRow key={index}>
								<TableCell
									key={index}
									align='center'>
									{item.ano}
								</TableCell>

								<TableCell
									key={index}
									align='center'>
									{item.mes.map((item, index) => {
										return (
											<div
												style={{ borderBottom: '1px solid #d0d0d0' }}
												key={index}>
												{item}
											</div>
										);
									})}
								</TableCell>
								<TableCell
									key={index}
									align='center'>
									{item.mensal.map((item, index) => {
										return (
											<div
												style={{ borderBottom: '1px solid #d0d0d0' }}
												key={index}>
												{item}
											</div>
										);
									})}
								</TableCell>
								<TableCell
									key={index}
									align='center'>
									{item.acumulado.map((item, index) => {
										return (
											<div
												style={{ borderBottom: '1px solid #d0d0d0' }}
												key={index}>
												{item}
											</div>
										);
									})}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
