/** @format */

import { Container, Stack, Typography } from '@mui/material';
import TableARProcessosAprovados from './table-ar-processos-aprovados';

export default function ARProcessosAprovados() {
	return (
		<Container
			maxWidth={'xl'}
			style={{ paddingBottom: '16px', paddingTop: '16px' }}>
			<Stack spacing={2}>
				<Typography
					variant='h4'
					style={{ fontWeight: '700' }}>
					APROVA RÁPIDO
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
				<TableARProcessosAprovados />
			</Stack>
		</Container>
	);
}
