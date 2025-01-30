/** @format */

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
			meses: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26]
		},
		{
			ano: 2018,
			meses: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26]
		},
		{
			ano: 2019,
			meses: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26]
		},
		{
			ano: 2020,
			meses: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26]
		},
		{
			ano: 2021,
			meses: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26]
		},
		{
			ano: 2022,
			meses: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26]
		},
		{
			ano: 2023,
			meses: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26]
		},
		{
			ano: 2024,
			meses: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26]
		}
	]
};

export default function TableData() {
	let totalAcumulado = relatorio.acumulado;
	return (
		relatorio.dados.map((ano, index) => {
			return (
				<TableContainer component={Paper} key={index}>
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
							{
								ano.meses.map((mes, index) => {
									totalAcumulado += mes;
									return (
										<TableRow key={index}>
											{index === 0 && 
											<TableCell
												align='center'
												rowSpan={12}
											>
												{index === 0 && ano.ano}
											</TableCell>}
											<TableCell align='center'>
												{arrayMeses[index]}
											</TableCell>
											<TableCell align='center'>
												{mes}
											</TableCell>
											<TableCell align='center'>
												{totalAcumulado}
											</TableCell>
										</TableRow>
									)
								})
							}
						</TableBody>
					</Table>
				</TableContainer>
			)
		})
	)
	// return (
	// 	<TableContainer component={Paper}>
	// 		<Table
	// 			aria-label='simple table'
	// 			size='small'>
	// 			<TableHead>
	// 				<TableRow>
	// 					<TableCell align='center'>Ano</TableCell>
	// 					<TableCell align='center'>Mês</TableCell>
	// 					<TableCell align='center'>Mensal</TableCell>
	// 					<TableCell align='center'>Acumulado</TableCell>
	// 				</TableRow>
	// 			</TableHead>
	// 			<TableBody>
	// 				{dadosAnuais?.map((item, index) => {
	// 					return (
	// 						<>
	// 							{
	// 								numeros.map((numero, index) => {
	// 									return (
	// 										<TableRow key={numero}>
	// 											{numero === 0 && <TableCell
	// 												align='center'
	// 												rowSpan={12}
	// 											>
	// 												{numero === 0 && item.ano}
	// 											</TableCell>}
	// 											<TableCell
	// 												align='center'
	// 											>
	// 												{item.mes[numero]}
	// 											</TableCell>
	// 											<TableCell
	// 												align='center'
	// 											>
	// 												{item.mensal[numero]}
	// 											</TableCell>
	// 											<TableCell
	// 												align='center'
	// 											>
	// 												{item.acumulado[numero]}
	// 											</TableCell>
	// 										</TableRow>
	// 									);
	// 								})
	// 							}
	// 						</>
	// 						// <TableRow key={index}>
	// 						// 	<TableCell
	// 						// 		key={index}
	// 						// 		align='center'>
	// 						// 		{item.ano}
	// 						// 	</TableCell>

	// 						// 	<TableCell
	// 						// 		key={index}
	// 						// 		align='center'>
	// 						// 		{item.mes.map((item, index) => {
	// 						// 			return (
	// 						// 				<div
	// 						// 					style={{ borderBottom: '.5px solid #e0e0e0' }}
	// 						// 					key={index}>
	// 						// 					{item}
	// 						// 				</div>
	// 						// 			);
	// 						// 		})}
	// 						// 	</TableCell>
	// 						// 	<TableCell
	// 						// 		key={index}
	// 						// 		align='center'>
	// 						// 		{item.mensal.map((item, index) => {
	// 						// 			return (
	// 						// 				<div
	// 						// 					style={{ borderBottom: '.5px solid #e0e0e0' }}
	// 						// 					key={index}>
	// 						// 					{item}
	// 						// 				</div>
	// 						// 			);
	// 						// 		})}
	// 						// 	</TableCell>
	// 						// 	<TableCell
	// 						// 		key={index}
	// 						// 		align='center'>
	// 						// 		{item.acumulado.map((item, index) => {
	// 						// 			return (
	// 						// 				<div
	// 						// 					style={{ borderBottom: '.5px solid #e0e0e0' }}
	// 						// 					key={index}>
	// 						// 					{item}
	// 						// 				</div>
	// 						// 			);
	// 						// 		})}
	// 						// 	</TableCell>
	// 						// </TableRow>
	// 					);
	// 				})}
	// 			</TableBody>
	// 		</Table>
	// 	</TableContainer>
	// );
}
