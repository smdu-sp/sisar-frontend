/** @format */

'use client';

import { LineChart } from '@mui/x-charts/LineChart';

export default function LineChartAr() {
	const uData = [
		4000, 3000, 2000, 2780, 1890, 2390, 3490, 2000, 2780, 1890, 2390, 3490,
	];

	const xLabels = [
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
	return (
		<LineChart
			width={1400}
			height={480}
			series={[
				{ data: uData, label: 'AR Protocolados No Tempo', color: '#06b6d4' },
			]}
			xAxis={[{ scaleType: 'point', data: xLabels }]}
		/>
	);
}
