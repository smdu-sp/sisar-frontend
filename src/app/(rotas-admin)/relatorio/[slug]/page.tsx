/** @format */

import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import TableData from './_components/table-data';
import { mockDataTable } from './constants/mockdata';
import dynamic from 'next/dynamic';

const LineChart = dynamic(() => import('./_components/line-chart'), {
	ssr: false,
});

const LineChartExample = dynamic(
	() => import('./_components/line-chert-exemples'),
	{
		ssr: false,
	},
);

export default async function PageRelatioSlug({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	return (
		<Container
			maxWidth={'xl'}
			style={{ paddingBottom: '16px', paddingTop: '20px' }}>
			<Stack spacing={10}>
				<Typography variant='h4'>Progressão AR Protocolados</Typography>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						gap: '16px',
					}}>
					{mockDataTable.map((item, index) => {
						return (
							<div
								key={index}
								style={{ paddingBottom: `${index == 0 ? '20px' : '8px'} ` }}>
								<TableData data={item} />
							</div>
						);
					})}
				</div>

				<LineChart />
				<LineChartExample />
			</Stack>
		</Container>
	);
}
