/** @format */

import { Container, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import TableRRProgressao from './table-rr-progressao-mensal';

const LineChartRR = dynamic(() => import('./line-chart-rr'), {
	ssr: false,
});

export default function RRProgressao() {
	return (
		<Container
			maxWidth={'xl'}
			style={{ paddingBottom: '0px', paddingTop: '16px' }}>
			<Stack spacing={4}>
				{/* <ThemeToggle /> */}
				<Typography
					variant='h4'
					style={{ fontWeight: '700' }}>
					Progressão RR Protocolados
				</Typography>

				<TableRRProgressao />

				<LineChartRR
					title="Progressão RR's Protocolados no tempo"
					series={[
						{
							name: 'RR Protocolados no tempo',
							data: [30, 40, 45, 50, 49, 60, 70, 91, 49, 60, 70, 91],
						},
					]}
					categories={[
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
					]}
					height={520}
				/>
			</Stack>
		</Container>
	);
}
