/** @format */

'use client';

import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useColorScheme, useTheme } from '@mui/material';
import { useContext } from 'react';
import Chart from 'react-apexcharts';

interface AreaChartsApexProps {
	title: string;
	categories?: string[];
	data?: any[];
	series?: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
	height: string | number | undefined;
	money?: boolean;
	percent?: boolean;
}

export default function LineChartsApexUnity(props: AreaChartsApexProps) {
	const { mode, toggleMode } = useContext(ThemeContext);

	if (mode == 'dark') {
		toggleMode();
	}

	const options: ApexCharts.ApexOptions = {
		chart: {
			id: 'line-bar',
			stacked: false,
			width: '100%',
			type: 'line',
			foreColor: '#242424',
			zoom: {
				enabled: false,
			},
			toolbar: {
				autoSelected: 'pan',
				show: false,
			},
		},
		legend: {
			showForSingleSeries: true,
			position: 'top',
			horizontalAlign: 'center',
			fontSize: '8x',
			fontWeight: 'bold',
			onItemHover: { highlightDataSeries: true },
			onItemClick: { toggleDataSeries: false },
			itemMargin: {
				vertical: 8,
				horizontal: 20,
			},
		},
		grid: {
			borderColor: 'rgba(255,255,255,0.1)',

			xaxis: {
				lines: {
					show: true,
				},
			},
			show: true,
			yaxis: {
				lines: {
					show: true,
				},
			},
		},
		dataLabels: {
			formatter: (val: number | string) =>
				`${
					props.money
						? val.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
						  })
						: props.percent
						? val + '%'
						: val
				} `,
			enabled: false,

			distributed: false,
			background: {
				enabled: true,
				borderRadius: 4,
				padding: 8,
				borderWidth: 1,
				foreColor: '#fafafa',
			},
			style: {
				colors: ['#00a1b9', '#f47e43'],
				fontSize: '16px',
			},
		},
		tooltip: {
			y: {
				formatter: (val: number | string) =>
					`${
						props.money
							? val.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
							  })
							: props.percent
							? val + '%'
							: val
					} `,
			},
		},
		colors: ['#00a1b9', '#f47e43'],
		title: {
			text: props.title,
			style: { fontWeight: 'bold', fontSize: '18px' },
		},
		fill: {
			gradient: {
				opacityFrom: 0.5,
				opacityTo: 0.2,
			},
		},
		markers: {
			size: 3,
			colors: ['#00a1b9', '#f47e43'],
			hover: { size: 5 },
			strokeWidth: 1,
		},

		xaxis: {
			type: 'category',
			tickPlacement: 'between',
			axisBorder: { show: true },
			categories: props.categories,
		},
		yaxis: {
			show: true,
			labels: {
				show: true,
				style: { fontSize: '9px' },
				formatter: (val: number | string) =>
					`${
						props.money
							? val.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
							  })
							: props.percent
							? val + '%'
							: val
					} `,
			},
			axisBorder: { show: true },
		},
		stroke: { curve: 'smooth', width: 2 },
		responsive: [
			{
				breakpoint: 580,
				options: {
					chart: {
						height: 580,
					},
					dataLabels: {
						enabled: false,
					},
					xaxis: {
						axisTicks: { show: true },
						tickPlacement: 'on',
						offsetY: 2,
						labels: {
							trim: false,
							style: { fontSize: '10px' },
							hideOverlappingLabels: true,
							rotate: -45,
						},
					},
					legend: {
						position: 'bottom',
						offsetY: 10,
						fontSize: '14x',
						itemMargin: {
							vertical: 8,
							horizontal: 8,
						},
					},
				},
			},
			{
				breakpoint: 3000,
				options: {
					chart: {
						height: 340,
					},
					dataLabels: {
						enabled: true,
					},
					xaxis: {
						labels: {
							trim: false,
							style: { fontSize: '12px' },
							rotate: 0,
							hideOverlappingLabels: true,
						},
					},
					legend: {
						position: 'top',
						offsetY: 0,
						fontSize: '12x',
						itemMargin: {
							vertical: 14,
							horizontal: 12,
						},
					},
				},
			},
		],
	};

	return (
		<Chart
			options={options}
			series={props.series}
			type='line'
			width={'100%'}
			height={props.height}></Chart>
	);
}
