/** @format */

import { Container, List, ListItem, Stack, Typography } from '@mui/material';
import React from 'react';
import TableResume from './_components/table-resume';
import TableResumeSecretaria from './_components/table-resume-secretaria';
import TableProcessos from './_components/table-processos';

export default function ARStatusResumoQnt() {
	return (
		<Container
			maxWidth={'xl'}
			style={{ paddingBottom: '16px', paddingTop: '16px' }}>
			<Stack spacing={2}>
				<Typography
					variant='h4'
					style={{ fontWeight: '700' }}>
					APROVA RÁPIDO
				</Typography>
			</Stack>
			<Stack
				direction='row'
				style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
				<div>
					<Typography
						variant='h6'
						style={{
							fontWeight: '500',
							paddingBottom: '0px',
							paddingTop: '40px',
						}}>
						Legenda:
					</Typography>
					<List>
						<ListItem style={{ color: 'orange' }}>
							laranja = Em análise de admissibilidade
						</ListItem>
						<ListItem style={{ color: 'red' }}>
							vermelho = Inadmissíveis{' '}
						</ListItem>
						<ListItem style={{ color: '#22c55e' }}>
							verde = Admissíveis ainda em análise{' '}
						</ListItem>
						<ListItem style={{ color: '#1e40af' }}>
							azul escuro = Processos deferidos{' '}
						</ListItem>
						<ListItem style={{ color: '#60a5fa' }}>
							azul claro = Processos indeferidos{' '}
						</ListItem>
						<ListItem style={{ color: '#a8a29e' }}>
							cinza = Via ordinária a pedido do interessado
						</ListItem>
					</List>
				</div>
				<TableResume />
			</Stack>

			<TableResumeSecretaria />
			<TableProcessos />
		</Container>
	);
}
