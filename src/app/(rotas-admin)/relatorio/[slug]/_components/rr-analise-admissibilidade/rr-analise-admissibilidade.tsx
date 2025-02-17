/** @format */

import { Container, Stack, Typography } from '@mui/material';
import TableRRAnaliseAdmissibilidade from './table-rr-analise-admissibilidade';
import TableResumeRRAnaliseAdmissibilidade from './table-resume-rr-analise-admissibilidade';

export default function RRAnaliseAdmissibilidade() {
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
					Análise de Admissibilidade | 01/01/2024 até 31/01/2025
				</Typography>
				<TableResumeRRAnaliseAdmissibilidade />
			</Stack>
			<Stack
				direction='row'
				style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
				<TableRRAnaliseAdmissibilidade />
			</Stack>
		</Container>
	);
}
