/** @format */

import dynamic from 'next/dynamic';
import ARProgressao from './_components/ar-progressao-mensal/ar-progressao';
import { Container } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import ArGabienetePrefeito from './_components/ar-gabinete-prefeito/ar-gabinete-prefeito';
import ArStatusResumoQnt from './_components/ar-status-resumo-quantitaivo/ar-status-resumo-quantitaivo';
import RRStatusResumoQtn from './_components/rr-status-resumo-quantitativo/rr-status-resumo-quantitativo';

export default async function PageRelatorioSlug({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	switch (slug) {
		case 'ar-grafico-progressao-mensal':
			return <ARProgressao />;
		case 'ar-gabinete-prefeito':
			return <ArGabienetePrefeito />;
		case 'ar-status-resumo-quantitaivo':
			return <ArStatusResumoQnt />;
		case 'rr-status-resumo-quantitativo':
			return <RRStatusResumoQtn />;
		default:
			<Container
				maxWidth={'xl'}
				style={{ paddingBottom: '0px', paddingTop: '16px' }}>
				<div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
					<h3>Nenhum relatório selecionado</h3>
					<a
						href='/relatorio'
						style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
						<ArrowBack style={{ width: '20px', height: '20px' }} />
						Voltar
					</a>
				</div>
			</Container>;
	}
}
