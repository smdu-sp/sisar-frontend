/** @format */

import { Container, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import TableData from './table-data';

const LineChart = dynamic(() => import('./line-chart'), {
	ssr: false,
});

export default function ARProtocolado() {
	return (
		<Container
			maxWidth={'xl'}
			style={{ paddingBottom: '0px', paddingTop: '16px' }}>
			<Stack spacing={4}>
				{/* <ThemeToggle /> */}
				<Typography variant='h4'>Progressão AR Protocolados</Typography>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						gap: '16px',
						paddingBottom: '20px',
					}}>
					<TableData />
				</div>
				<LineChart
					title="AR's Protocolados no tempo"
					series={[
						{
							name: 'AR Protocolados no tempo',
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
