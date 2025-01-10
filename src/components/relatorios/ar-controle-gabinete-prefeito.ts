/** @format */

export const getArControleGabinetePrefeito = async (
	month: string,
	year: string,
) => {
	// const quantitativo: IAprovaRapidoQuantitativoResponse = await getRelatorioArQuantitativo(month, year);
	// if (!quantitativo) throw new Error("Não existe relatório na variável quantitativo - PDF");
	const docDefinition = {
		pageOrientation: 'landscape',
		content: [
			{ text: 'APROVA RÁPIDO', style: 'heading1' },
			{
				text: 'RELAÇÃO DE PROCESSOS PROTOCOLADOS | PROCESSOS DEFERIDOS',
				style: 'heading2',
			},
			{
				table: {
					headerRows: 1,
					widths: [
						'8%',
						'10%',
						'8%',
						'10%',
						'9%',
						'8.5%',
						'8%',
						'8%',
						'10%',
						'13%',
						'8%',
					],
					body: [
						[
							{ text: 'MÊS/2018', style: 'tableHeader' },
							{
								text: 'PROCESSOS PROTOCOLADOS APROVA RÁPIDO',
								style: 'tableHeader',
							},
							{ text: 'PROCESSOS APROVADOS', style: 'tableHeader' },
							{ text: 'Nº PROCESSO', style: 'tableHeader' },
							{
								text: 'TEMPO DE ANÁLISE PEDIDO INICIAL (dias)',
								style: 'tableHeader',
							},
							{ text: 'TEMPO DE ANÁLISE RECURSO (dias)', style: 'tableHeader' },
							{ text: 'CATEGORIA DE USO', style: 'tableHeader' },
							{ text: 'RESPONSÁVEL PELO PROJETO', style: 'tableHeader' },
							{ text: 'EMPRESA', style: 'tableHeader' },
							{ text: 'CARACTERÍSTICAS PROJETO', style: 'tableHeader' },
							{ text: 'REGIÃO DA CIDADE', style: 'tableHeader' },
						],
						[
							{ text: 'JANEIRO', style: 'tableCell' },
							{ text: '4', style: 'tableCell' },
							{ text: '2', style: 'tableCell' },

							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '32', style: 'tableCell' }],
										[{ text: '42', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '52', style: 'tableCell' }],
										[{ text: '22', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'HMP', style: 'tableCell' }],
										[{ text: 'HIS', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Rafael Pereira', style: 'tableCell' }],
										[{ text: 'João Santos', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Empresa 1', style: 'tableCell' }],
										[{ text: 'Empresa 2', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Zona Leste', style: 'tableCell' }],
										[{ text: 'Zona Oeste', style: 'tableCell' }],
									],
								},
							},
						],
						[
							{ text: 'FEVEREIRO', style: 'tableCell' },
							{ text: '4', style: 'tableCell' },
							{ text: '2', style: 'tableCell' },

							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '32', style: 'tableCell' }],
										[{ text: '42', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '52', style: 'tableCell' }],
										[{ text: '22', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'HMP', style: 'tableCell' }],
										[{ text: 'HIS', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Rafael Pereira', style: 'tableCell' }],
										[{ text: 'João Santos', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Empresa 1', style: 'tableCell' }],
										[{ text: 'Empresa 2', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Zona Leste', style: 'tableCell' }],
										[{ text: 'Zona Oeste', style: 'tableCell' }],
									],
								},
							},
						],
						[
							{ text: 'ABRIL', style: 'tableCell' },
							{ text: '4', style: 'tableCell' },
							{ text: '2', style: 'tableCell' },

							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '32', style: 'tableCell' }],
										[{ text: '42', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '52', style: 'tableCell' }],
										[{ text: '22', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'HMP', style: 'tableCell' }],
										[{ text: 'HIS', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Rafael Pereira', style: 'tableCell' }],
										[{ text: 'João Santos', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Empresa 1', style: 'tableCell' }],
										[{ text: 'Empresa 2', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Zona Leste', style: 'tableCell' }],
										[{ text: 'Zona Oeste', style: 'tableCell' }],
									],
								},
							},
						],
						[
							{ text: 'MAIO', style: 'tableCell' },
							{ text: '4', style: 'tableCell' },
							{ text: '2', style: 'tableCell' },

							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '32', style: 'tableCell' }],
										[{ text: '42', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '52', style: 'tableCell' }],
										[{ text: '22', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'HMP', style: 'tableCell' }],
										[{ text: 'HIS', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Rafael Pereira', style: 'tableCell' }],
										[{ text: 'João Santos', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Empresa 1', style: 'tableCell' }],
										[{ text: 'Empresa 2', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Zona Leste', style: 'tableCell' }],
										[{ text: 'Zona Oeste', style: 'tableCell' }],
									],
								},
							},
						],
						[
							{ text: 'JUNHO', style: 'tableCell' },
							{ text: '4', style: 'tableCell' },
							{ text: '2', style: 'tableCell' },

							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '32', style: 'tableCell' }],
										[{ text: '42', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '52', style: 'tableCell' }],
										[{ text: '22', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'HMP', style: 'tableCell' }],
										[{ text: 'HIS', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Rafael Pereira', style: 'tableCell' }],
										[{ text: 'João Santos', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Empresa 1', style: 'tableCell' }],
										[{ text: 'Empresa 2', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Zona Leste', style: 'tableCell' }],
										[{ text: 'Zona Oeste', style: 'tableCell' }],
									],
								},
							},
						],
						[
							{ text: 'JULHO', style: 'tableCell' },
							{ text: '4', style: 'tableCell' },
							{ text: '2', style: 'tableCell' },

							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '32', style: 'tableCell' }],
										[{ text: '42', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '52', style: 'tableCell' }],
										[{ text: '22', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'HMP', style: 'tableCell' }],
										[{ text: 'HIS', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Rafael Pereira', style: 'tableCell' }],
										[{ text: 'João Santos', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Empresa 1', style: 'tableCell' }],
										[{ text: 'Empresa 2', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Zona Leste', style: 'tableCell' }],
										[{ text: 'Zona Oeste', style: 'tableCell' }],
									],
								},
							},
						],
						[
							{ text: 'AGOSTO', style: 'tableCell' },
							{ text: '4', style: 'tableCell' },
							{ text: '2', style: 'tableCell' },

							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '32', style: 'tableCell' }],
										[{ text: '42', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '52', style: 'tableCell' }],
										[{ text: '22', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'HMP', style: 'tableCell' }],
										[{ text: 'HIS', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Rafael Pereira', style: 'tableCell' }],
										[{ text: 'João Santos', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Empresa 1', style: 'tableCell' }],
										[{ text: 'Empresa 2', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Zona Leste', style: 'tableCell' }],
										[{ text: 'Zona Oeste', style: 'tableCell' }],
									],
								},
							},
						],
						[
							{ text: 'SETEMBRO', style: 'tableCell' },
							{ text: '4', style: 'tableCell' },
							{ text: '2', style: 'tableCell' },

							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '32', style: 'tableCell' }],
										[{ text: '42', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '52', style: 'tableCell' }],
										[{ text: '22', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'HMP', style: 'tableCell' }],
										[{ text: 'HIS', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Rafael Pereira', style: 'tableCell' }],
										[{ text: 'João Santos', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Empresa 1', style: 'tableCell' }],
										[{ text: 'Empresa 2', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Zona Leste', style: 'tableCell' }],
										[{ text: 'Zona Oeste', style: 'tableCell' }],
									],
								},
							},
						],
						[
							{ text: 'OUTUBRO', style: 'tableCell' },
							{ text: '4', style: 'tableCell' },
							{ text: '2', style: 'tableCell' },

							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '32', style: 'tableCell' }],
										[{ text: '42', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '52', style: 'tableCell' }],
										[{ text: '22', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'HMP', style: 'tableCell' }],
										[{ text: 'HIS', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Rafael Pereira', style: 'tableCell' }],
										[{ text: 'João Santos', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Empresa 1', style: 'tableCell' }],
										[{ text: 'Empresa 2', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Zona Leste', style: 'tableCell' }],
										[{ text: 'Zona Oeste', style: 'tableCell' }],
									],
								},
							},
						],
						[
							{ text: 'NOVEMBRO', style: 'tableCell' },
							{ text: '4', style: 'tableCell' },
							{ text: '2', style: 'tableCell' },

							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '32', style: 'tableCell' }],
										[{ text: '42', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '52', style: 'tableCell' }],
										[{ text: '22', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'HMP', style: 'tableCell' }],
										[{ text: 'HIS', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Rafael Pereira', style: 'tableCell' }],
										[{ text: 'João Santos', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Empresa 1', style: 'tableCell' }],
										[{ text: 'Empresa 2', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Zona Leste', style: 'tableCell' }],
										[{ text: 'Zona Oeste', style: 'tableCell' }],
									],
								},
							},
						],
						[
							{ text: 'DEZEMBRO', style: 'tableCell' },
							{ text: '4', style: 'tableCell' },
							{ text: '2', style: 'tableCell' },

							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
										[{ text: '2018.0.034.567-1', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '32', style: 'tableCell' }],
										[{ text: '42', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: '52', style: 'tableCell' }],
										[{ text: '22', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'HMP', style: 'tableCell' }],
										[{ text: 'HIS', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Rafael Pereira', style: 'tableCell' }],
										[{ text: 'João Santos', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Empresa 1', style: 'tableCell' }],
										[{ text: 'Empresa 2', style: 'tableCell' }],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
										[
											{
												text: 'Dois blocos, com 23 e 22 pavimentos, totalizando 392 unidades',
												style: 'tableCaracteristica',
											},
										],
									],
								},
							},
							{
								layout: 'headerLineOnly',
								table: {
									body: [
										[{ text: 'Zona Leste', style: 'tableCell' }],
										[{ text: 'Zona Oeste', style: 'tableCell' }],
									],
								},
							},
						],
						// Continue adicionando os dados das linhas aqui...
					],
				},
			},
		],

		// Estilização via CSS personalizado
		styles: {
			heading1: {
				fontSize: 18,
				bold: true,
				marginBottom: 8,
				color: 'black',
			},
			heading2: {
				fontSize: 14,
				semibold: true,
				marginBottom: 16,
				color: 'grey',
			},
			tableHeader: {
				bold: true,
				fontSize: 8,
				color: 'black',
			},
			tableCell: {
				fontSize: 8,
			},
			tableCaracteristica: {
				fontSize: 7,
			},
		},
	};
	return docDefinition;
};
