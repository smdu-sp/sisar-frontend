/** @format */

import { Container, Stack, Typography } from '@mui/material';
import TableRRProcessosAprovados from './table-rr-processos-aprovados';

export default function RRProcessosAprovados() {
	return (
		<Container
			maxWidth={'xl'}
			style={{ paddingBottom: '16px', paddingTop: '16px' }}>
			<Stack spacing={2}>
				<Typography
					variant='h4'
					style={{ fontWeight: '700' }}>
					REQUALIFICA RÁPIDO
				</Typography>{' '}
				<Typography
					variant='h5'
					style={{ fontWeight: '500', color: '#acacac' }}>
					Processos Aprovados
				</Typography>
			</Stack>
			<Stack
				direction='row'
				style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
				<TableRRProcessosAprovados />
			</Stack>
		</Container>
	);
}
