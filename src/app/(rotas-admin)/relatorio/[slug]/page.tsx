/** @format */

import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import TableData from './_components/table-data';
import { mockDataTable } from './_constants/mockdata';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import ThemeToggle from '@/components/ThemeToggle';

const LineChart = dynamic(() => import('./_components/line-chart'), {
	ssr: false,
});

export default function PageRelatioSlug() {
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
					}}>
					<TableData />
					<TableData />
					<TableData />
					<TableData />
					<TableData />
					<TableData />
					<TableData />
					<TableData />
				</div>
				<LineChart
					title='AR'
					series={[
						{
							name: 'AR',
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
