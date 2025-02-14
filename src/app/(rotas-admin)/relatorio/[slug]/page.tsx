/** @format */

import { ArrowBack } from '@mui/icons-material';
import { Button, Card, CardContent, Sheet, Typography } from '@mui/joy';
import ArGabinetePrefeito from './_components/ar-gabinete-prefeito/ar-gabinete-prefeito';
import ARProcessosAprovados from './_components/ar-processos-aprovados/ar-processos-aprovados';
import ARProgressao from './_components/ar-progressao-mensal/ar-progressao';
import ArStatusResumoQnt from './_components/ar-status-resumo-quantitaivo/ar-status-resumo-quantitaivo';
import RRProgressao from './_components/rr-grafico-progressao-mensal/rr-grafico-progressao-mensal';
import RRResumoQuantitativo from './_components/rr-resumo-quantitativo/rr-resumo-quantitativo';
import RRStatusQuantitativo from './_components/rr-status-quantitativo/rr-status-resumo-quantitativo';

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
			return <ArGabinetePrefeito />;
		case `ar-status-resumo-quantitaivo`:
			return <ArStatusResumoQnt />;
		case `rr-status-quantitativo`:
			return <RRStatusQuantitativo />;
		case `rr-resumo-quantitativo`:
			return <RRResumoQuantitativo />;
		case `ar-processos-aprovados`:
			return <ARProcessosAprovados />;
		case `rr-grafico-progressao-mensal`:
			return <RRProgressao />;
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
