/** @format */

import React from 'react';
import { LineChart } from '@mui/x-charts';

const data = [
	{ x: 1, y: 10 },
	{ x: 2, y: 20 },
	{ x: 3, y: 15 },
	{ x: 4, y: 30 },
];

// Extrair valores de X e Y
const xValues = data.map((point) => point.x);
const yValues = data.map((point) => point.y);

export default function LineChartWithLabels() {
	return (
		<LineChart
			xAxis={[{ scaleType: 'linear', data: xValues, label: 'X Axis' }]}
			yAxis={[{ scaleType: 'linear', label: 'Y Axis' }]}
			series={[
				{
					data: yValues,
					label: 'Meu Gráfico',
					color: '#1976d2',
				},
			]}
			width={600}
			height={400}
			sx={{
				position: 'relative',
			}}>
			{data.map((point, index) => (
				<text
					key={index}
					x={point.x * 100} // Ajustar escala de x para combinar com o gráfico
					y={400 - point.y * 10} // Ajustar escala de y (altura - y)
					fontSize='12'
					fill='#1976d2'
					textAnchor='middle'>
					{point.y}
				</text>
			))}
		</LineChart>
	);
}
