/** @format */

import ARProgressao from './_components/ar-progressao-mensal/ar-progressao';
import { Container } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import ArGabienetePrefeito from './_components/ar-gabinete-prefeito/ar-gabinete-prefeito';
import ArStatusResumoQnt from './_components/ar-status-resumo-quantitaivo/ar-status-resumo-quantitaivo';
import RRStatusResumoQtn from './_components/rr-status-resumo-quantitativo/rr-status-resumo-quantitativo';
import { Button, Card, CardContent, Sheet, Typography } from '@mui/joy';

export default async function PageRelatorioSlug({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	switch (slug) {
		case `ar-grafico-progressao-mensal`:
			return <ARProgressao />;
		case `ar-gabinete-prefeito`:
			return <ArGabienetePrefeito />;
		case `ar-status-resumo-quantitaivo`:
			return <ArStatusResumoQnt />;
		case `rr-status-resumo-quantitativo`:
			return <RRStatusResumoQtn />;
		default:
			return (
				<Sheet
					sx={{
						height: '100vh',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'center',
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
					}}>
					<Typography
						level='h1'
						color='primary'>
						404
					</Typography>
					<Card
						variant='outlined'
						color='primary'
						size='lg'
						invertedColors
						sx={{
							boxShadow: 'lg',
							width: 400,
							maxWidth: '100%',
						}}>
						<CardContent sx={{ gap: 2 }}>
							<Typography level='title-lg'>Relatório não encontrado</Typography>
							<Typography level='body-md'>
								Parece que a página que você está procurando não existe ou foi
								movida.
							</Typography>
						</CardContent>
					</Card>
					<a href='/relatorio'>
						<Button
							startDecorator={<ArrowBack />}
							variant='plain'
							color='primary'
							sx={{
								':hover': {
									bgcolor: 'transparent',
								},
							}}>
							Retornar aos relatórios
						</Button>
					</a>
				</Sheet>
			);
	}
}
