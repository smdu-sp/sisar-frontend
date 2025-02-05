/** @format */

import React from 'react';
import TableData from './table-data';
import { Container, Stack, Typography } from '@mui/material';

export default function ARGabienetePrefeito() {
	return (
		<Container
			maxWidth={'xl'}
			style={{ paddingBottom: '0px', paddingTop: '16px' }}>
			<Stack spacing={1}>
				{/* <ThemeToggle /> */}
				<Typography
					variant='h4'
					style={{ fontWeight: '700' }}>
					APROVA RÁPIDO
				</Typography>
				<Typography
					variant='h5'
					style={{ fontWeight: '500', color: '#acacac' }}>
					Relação de Processos Protocolados | Processos Deferidos
				</Typography>

				<TableData />
			</Stack>
		</Container>
	);
}
