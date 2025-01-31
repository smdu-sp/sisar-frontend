/** @format */

import { Container, Stack, Typography, Grid } from '@mui/material';
import dynamic from 'next/dynamic';
import TableData from './table-data';

const LineChart = dynamic(() => import('./line-chart'), {
	ssr: false,
});

export default function ARProgressão() {
	return (
		<Container
			maxWidth={'xl'}
			style={{ paddingBottom: '0px', paddingTop: '16px' }}>
			<Stack spacing={4}>
				{/* <ThemeToggle /> */}
				<Typography variant='h4' style={{fontWeight:'700'}}>Progressão AR Protocolados</Typography>
				
					<TableData />

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
