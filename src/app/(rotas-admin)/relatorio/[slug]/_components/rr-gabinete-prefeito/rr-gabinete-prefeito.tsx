/** @format */

import { Container, Stack, Typography } from '@mui/material';
import TableRRGabinetePrefeito from './table-rr-gabinete-prefeito';

export default function RRGabienetePrefeito() {
	return (
		<Container
			maxWidth={'xl'}
			style={{ paddingBottom: '0px', paddingTop: '16px' }}>
			<Stack spacing={1}>
				{/* <ThemeToggle /> */}
				<Typography
					variant='h4'
					style={{ fontWeight: '700' }}>
					REQUALIFICA RÁPIDO
				</Typography>
				<Typography
					variant='h5'
					style={{ fontWeight: '500', color: '#acacac' }}>
					Relação de Processos Protocolados | Processos Deferidos
				</Typography>
				<TableRRGabinetePrefeito />
			</Stack>
		</Container>
	);
}
