/** @format */

import dynamic from 'next/dynamic';
import ARProtocolado from './_components/ar-protocolados/ar-protocolado';
import { Container } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

export default async function PageRelatorioSlug({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	if (slug == 'ar-grafico-progressao-mensal') {
		return <ARProtocolado />;
	} else {
		return (
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
			</Container>
		);
	}
}
