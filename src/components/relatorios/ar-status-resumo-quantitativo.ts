// APROVA RÁPIDO STATUS E RESUMO QUANTITATIVO

import { IInicial } from '@/shared/services/admissibilidade/admissibilidade.services';
import * as relatorioService from '@/shared/services/relatorios/relatorio.service';
import { IAprovaRapidoQuantitativoResponse } from '@/types/relatorio/relatorio.dto';

// Modelo XLSX
export const getRelatorioArQuantitativo = async (month: string, year: string): Promise<IAprovaRapidoQuantitativoResponse> => {
  const relatorio: IAprovaRapidoQuantitativoResponse = await relatorioService.relatorioQuantitativo(month, year);
  if (!relatorio) throw new Error("Não foi possível buscar o reltório");
  return relatorio;
};

const smulData = async (quantitativo: IAprovaRapidoQuantitativoResponse): Promise<{ Key: string, Value: number }[]> => {
  if (quantitativo == null || quantitativo == undefined) throw new Error('Não foi possível buscar o relatório');
  if (!quantitativo.em_analise.smul.data.length || quantitativo.em_analise.smul.data.length < 1) {
    return [{ Key: "", Value: 0 }]
  }
  return quantitativo.em_analise.smul.data.map((item: { nome: string, count: number }) => ({
    Key: item.nome,
    Value: item.count
  }));
}

const graproemData = async (quantitativo: IAprovaRapidoQuantitativoResponse): Promise<{ Key: string, Value: number }[]> => {
  if (quantitativo == null || quantitativo == undefined) throw new Error('Não foi possível buscar o relatório');
  if (!quantitativo.em_analise.graproem.data.length || quantitativo.em_analise.graproem.data.length < 1) {
    return [{ Key: "", Value: 0 }]
  }
  return quantitativo.em_analise.graproem.data.map((item: { nome: string, count: number }) => ({
    Key: item.nome,
    Value: item.count
  }));
}

export const getArQunatitativoXlsx = async (month: string, year: string): Promise<{ Key: string, Value: any }[]> => {
  const quantitativo: IAprovaRapidoQuantitativoResponse = await getRelatorioArQuantitativo(month, year);
  if (!quantitativo) throw new Error("Não foi possível buscar o reltório");
  return [
    { Key: '', Value: '' },
    { Key: 'Dados totais', Value: '' },
    { Key: 'Total', Value: quantitativo.total },
    { Key: 'Análise', Value: quantitativo.analise },
    { Key: 'Inadimissíveis', Value: quantitativo.inadmissiveis },
    { Key: 'Admissíveis', Value: quantitativo.admissiveis },
    { Key: 'Data Gerado', Value: quantitativo.data_gerado },
    { Key: '', Value: '' },
    { Key: 'Em Analise', Value: '' },
    { Key: 'SMUL', Value: quantitativo.em_analise.smul.quantidade },
    { Key: 'GRAPROEM', Value: quantitativo.em_analise.graproem.quantidade },
    { Key: 'Total Parcial', Value: quantitativo.em_analise.total_parcial ? quantitativo.em_analise.total_parcial : 0 },
    { Key: '', Value: '' },
    { Key: 'Deferidos', Value: '' },
    { Key: 'SMUL', Value: quantitativo.deferidos.smul.quantidade },
    { Key: 'GRAPROEM', Value: quantitativo.deferidos.graproem.quantidade },
    { Key: 'Total Parcial', Value: quantitativo.deferidos.total_parcial ? quantitativo.deferidos.total_parcial : 0 },
    { Key: '', Value: '' },
    { Key: 'Indeferidos', Value: '' },
    { Key: 'SMUL', Value: quantitativo.indeferidos.smul.quantidade },
    { Key: 'GRAPROEM', Value: quantitativo.indeferidos.graproem.quantidade },
    { Key: 'Total Parcial', Value: quantitativo.indeferidos.total_parcial ? quantitativo.indeferidos.total_parcial : 0 },
    { Key: '', Value: '' },
    { Key: 'SMUL', Value: '' },
    ...(await smulData(quantitativo)),
    { Key: '', Value: '' },
    { Key: 'Graproem', Value: '' },
    ...(await graproemData(quantitativo))
  ]
};

// Modelo PDF
const gerarLinhasDeDados = (data: { nome: string, count: number }[], style: string): { text: string, style: string }[][] => {
  const linhas = [];
  for (const unidade in data) {
    const valor = data[unidade];
    linhas.push([ 
      { text: unidade, style: style }, 
      { text: valor.toString(), style: style } 
    ]);
  }
  return linhas;
}

export const getArStatusResumoQuantitativoPdf = async (month: string, year: string) => {
  const quantitativo: IAprovaRapidoQuantitativoResponse = await getRelatorioArQuantitativo(month, year);
  if (!quantitativo) throw new Error("Não existe relatório na variável quantitativo - PDF");
  const docDefinition = {
    content: [

      // Cabeçalho
      { text: 'APROVA RÁPIDO', style: 'header' },

      // Tabela superior
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto'],
          body: [
            [
              { text: 'TOTAL DE PROCESSOS', style: 'tableHeader' },
              { text: quantitativo?.total, style: 'tableDataTotalProcessos' }
            ],
            [
              { text: 'ANÁLISE DE ADMISSIBILIDADE', style: 'admissibilidadeHeader' },
              { text: quantitativo?.analise, style: 'tableData' }
            ],
            [
              { text: 'INADMISSÍVEIS', style: 'inadmissiveisHeader' },
              { text: quantitativo?.inadmissiveis, style: 'tableData' }
            ],
            [
              { text: 'ADMISSÍVEIS', style: 'admissiveisHeader' },
              { text: quantitativo?.admissiveis, style: 'tableData' }
            ],
          ]
        }
      },

      // Divisória invisível
      { text: "", style: "divisoria" },

      {
        table: {
          headerRows: 1,
          widths: ['35%', '*'],
          body: [
            [
              // Dados de quantidade de processos em análise
              { text: '1. Em Análise', style: 'tableUnidadesHeaderEmAnalise' },
              {
                table: {
                  headerRows: 1,
                  widths: ['80%', '*'],
                  body: [
                    [
                      { text: 'SMUL', style: 'tableUnidadesEmAnalise' },
                      { text: quantitativo.em_analise.smul.quantidade, style: 'tableUnidadesEmAnalise' },
                    ],

                    ...gerarLinhasDeDados(quantitativo.em_analise.smul.data, 'dataSmulEmAnalise'),

                    [
                      { text: 'GRAPROEM', style: 'tableUnidadesEmAnalise' },
                      { text: quantitativo.em_analise.graproem.quantidade, style: 'tableUnidadesEmAnalise' },
                    ],

                    ...gerarLinhasDeDados(quantitativo.em_analise.graproem.data, 'dataSmulEmAnalise'),

                    [
                      { text: 'Total parcial', style: 'tableUnidadesEmAnalise' },
                      { text: quantitativo.em_analise.total_parcial, style: 'tableUnidadesEmAnalise' }
                    ]
                  ],
                },
                border: [0, 0, 0, 0],
              },
            ],
            [
              // Dados de quantidade de processos deferidos
              { text: '2. Deferidos', style: 'tableUnidadesHeaderDeferidos' },
              {
                table: {
                  headerRows: 1,
                  widths: ['80%', '*'],
                  body: [
                    [
                      { text: 'SMUL', style: 'tableUnidadesDeferidos' },
                      { text: quantitativo.deferidos.smul.quantidade, style: 'tableUnidadesDeferidos' },
                    ],

                    ...gerarLinhasDeDados(quantitativo.deferidos.smul.data, 'dataSmulDeferidos'),

                    [
                      { text: 'GRAPROEM', style: 'tableUnidadesDeferidos' },
                      { text: quantitativo.deferidos.graproem.quantidade, style: 'tableUnidadesDeferidos' },
                    ],

                    ...gerarLinhasDeDados(quantitativo.deferidos.graproem.data, 'dataSmulDeferidos'),

                    [
                      { text: 'Total parcial', style: 'tableUnidadesDeferidos' },
                      { text: quantitativo.deferidos.total_parcial, style: 'tableUnidadesDeferidos' }
                    ]
                  ],
                },
                border: [0, 0, 0, 0],
              },
            ],
            [
              // Dados de quantidade de processos indeferidos
              { text: '3. Indeferidos', style: 'tableUnidadesHeaderIndeferidos' },
              {
                table: {
                  headerRows: 1,
                  widths: ['80%', '*'],
                  body: [
                    [
                      { text: 'SMUL', style: 'tableUnidadesIndeferidos' },
                      { text: quantitativo.indeferidos.smul.quantidade, style: 'tableUnidadesIndeferidos' },
                    ],

                    ...gerarLinhasDeDados(quantitativo.indeferidos.smul.data, 'dataSmulIndeferidos'),

                    [
                      { text: 'GRAPROEM', style: 'tableUnidadesIndeferidos' },
                      { text: quantitativo.indeferidos.graproem.quantidade, style: 'tableUnidadesIndeferidos' },
                    ],

                    ...gerarLinhasDeDados(quantitativo.indeferidos.graproem.data, 'dataSmulIndeferidos'),

                    [
                      { text: 'Total parcial', style: 'tableUnidadesIndeferidos' },
                      { text: quantitativo.indeferidos.total_parcial, style: 'tableUnidadesIndeferidos' }
                    ]
                  ],
                },
                border: [0, 0, 0, 0],
              },
            ],
            [
              // Via ordinária
              { text: '4. Via Ordinária a Pedido do Interessado', style: 'tableUnidadesViaOrdinaria' },
              { text: quantitativo?.admissiveis, style: 'tableUnidadesViaOrdinaria' }
            ],
          ]
        },
      },

      // Processos
      { text: 'LEGENDA:', style: 'header_legenda' },
      { text: 'laranja = em análise de admissibilidade', style: 'legenda_laranja' },
      { text: 'vermelho = inadmissíveis', style: 'legenda_vermelho' },
      { text: 'verde = admissíveis ainda em análise', style: 'legenda_verde' },
      { text: 'azul escuro = processos deferidos', style: 'legenda_azulEs' },
      { text: 'azul claro = processos indeferidos', style: 'legenda_azulCl' },
      { text: 'cinza = via ordinária a pedido do interessado', style: 'legenda_cinza' },

      { text: 'PROCESSOS:', style: 'header_processos' },
      {
        table: {
          headerRows: 1,
          cols: 2,
          widths: ['auto', '*', 'auto'],
          body: [
            [
              { text: 'PROCESSO', style: 'tableProcessoHeader' },
              { text: 'STATUS', style: 'tableProcessoHeader' },
              { text: 'DESCRIÇÃO DE STATUS', style: 'tableProcessoHeader' }
            ],

            // Legenda de status de processos:
            // case 0: return 'analiseData';
            // case 1: return 'inadmissivelData';
            // case 2: return 'admissivelData';
            // case 3: return 'deferidoData';
            // case 4: return 'indeferidoData';
            // default: return 'tableUnidadesViaOrdinaria'

            // Dados de processos em analise de admissibilidade
            ...quantitativo?.analise_admissiveis_dados?.map((a: IInicial): { text: string | undefined, style: string }[] => [
              { 
                text: a.sei || a.processo_fisico || a.aprova_digital , 
                style: 'analiseData'
              },
              {
                text: 'Em analise de admissibilidade',
                style: 'analiseData'
              },
              { 
                text: a.obs, 
                style: 'analiseData'
              }
            ]),

            // Dados de processos inadimissíveis
            ...quantitativo?.inadmissiveis_dados?.map((a: IInicial): { text: string | undefined, style: string }[] => [
              { 
                text: a.sei || a.processo_fisico || a.aprova_digital, 
                style: 'inadmissivelData'
              },
              {
                text: 'Inadmissível',
                style: 'inadmissivelData'
              },
              { 
                text: a.obs, 
                style: 'inadmissivelData'  
              }
            ]),

            // Dados de processos admissíveis ainda em análise
            ...quantitativo?.em_analise_dados?.map((a: IInicial): { text: string | undefined, style: string }[] => [
              { 
                text: a.sei || a.processo_fisico || a.aprova_digital, 
                style: 'admissivelData'
              },
              {
                text: 'Admissível em análise',
                style: 'admissivelData'
              },
              { 
                text: a.obs, 
                style: 'admissivelData'
              }
            ]),

            // Dados de processos deferidos
            ...quantitativo?.deferidos_dados?.map((a: IInicial): { text: string | undefined, style: string }[] => [
              { 
                text: a.sei || a.processo_fisico || a.aprova_digital, 
                style: 'deferidoData'
              },
              {
                text: 'Deferido',
                style: 'deferidoData'
              },
              { 
                text: a.obs, 
                style: 'deferidoData'  
              }
            ]),

            // Dados de processos indeferidos
            ...quantitativo?.indeferidos_dados?.map((a: IInicial): { text: string | undefined, style: string }[] => [
              { 
                text: a.sei || a.processo_fisico || a.aprova_digital, 
                style: 'indeferidoData'
              },
              {
                text: 'Indeferido',
                style: 'indeferidoData'
              },
              { 
                text: a.obs, 
                style: 'indeferidoData' 
              }
            ]),

            // Dados de processos em via ordinaria
            ...quantitativo?.via_ordinaria_dados?.map((a: IInicial): { text: string | undefined, style: string }[] => [
              { 
                text: a.sei || a.processo_fisico || a.aprova_digital, 
                style: 'tableUnidadesViaOrdinaria'
              },
              {
                text: 'Via orinária',
                style: 'tableUnidadesViaOrdinaria'
              },
              { 
                text: a.obs, 
                style: 'tableUnidadesViaOrdinaria'
              }
            ]),
          ]
        }
      },
    ],

    // Estilização via CSS personalizado
    styles: {
      divisoria: {
        marginTop: 10,
        marginBottom: 10
      },
      table: {
        marginBottom: 10,
      },
      header: {
        fontSize: 18,
        bold: true,
        marginBottom: 10,
      },
      tableHeader: {
        fontSize: 14,
        bold: true,
      },
      admissibilidadeHeader: {
        fontSize: 12,
        bold: true,
        color: '#D6A24A',
      },
      inadmissiveisHeader: {
        fontSize: 12,
        bold: true,
        color: 'red',
      },
      admissiveisHeader: {
        fontSize: 12,
        bold: true,
        color: 'purple',
      },
      tableData: {
        fontSize: 12,
      },
      tableDataTotalProcessos: {
        fontSize: 12,
        bold: true
      },

      // Sessão da tabela de unidades
      tableUnidadesHeaderEmAnalise: {
        marginBottom: 10,
        color: 'green'
      },
      tableUnidadesHeaderDeferidos: {
        marginBottom: 10,
        color: 'darkblue'
      },
      tableUnidadesHeaderIndeferidos: {
        marginBottom: 10,
        color: '#75B8E6'
      },
      tableUnidadesViaOrdinaria: {
        color: 'gray'
      },
      tableUnidadesEmAnalise: {
        color: 'green',
        bold: true
      },
      tableUnidadesDeferidos: {
        color: 'darkblue',
        bold: true
      },
      tableUnidadesIndeferidos: {
        color: '#75B8E6',
        bold: true
      },
      dataSmulIndeferidos: {
        color: '#75B8E6'
      },
      dataSmulDeferidos: {
        color: 'darkblue'
      },
      dataSmulEmAnalise: {
        color: 'green'
      },

      // Sessão de PROCESSOS
      header_legenda: {
        marginTop: 20,
        marginBottom: 8,
        fontSize: 9.5
      },
      legenda_laranja: {
        color: 'orange',
        fontSize: 9
      },
      legenda_vermelho: {
        color: 'red',
        fontSize: 9
      },
      legenda_verde: {
        color: 'green',
        fontSize: 9
      },
      legenda_azulEs: {
        color: 'darkblue',
        fontSize: 9
      },
      legenda_azulCl: {
        color: '#75B8E6',
        fontSize: 9
      },
      legenda_cinza: {
        color: 'gray',
        fontSize: 9
      },

      header_processos: {
        marginTop: 20,
        marginBottom: 8,
        fontSize: 9.5,
        decoration: 'underline'
      },
      tableProcessoHeader: {
        margin: 10,
        fontSize: 9.5,
        alignment: 'center',
        valign: 'middle',
        border: 0.5
      },

      // Tabela de dados dos processos
      analiseData: {
        alignment: 'center',
        color: 'orange',
        valign: 'middle',
        fontSize: 8
      },
      inadmissivelData: {
        alignment: 'center',
        color: 'red',
        valign: 'middle',
        fontSize: 8
      },
      admissivelData: {
        alignment: 'center',
        color: 'green',
        valign: 'middle',
        fontSize: 8
      },
      deferidoData: {
        alignment: 'center',
        color: 'darkblue',
        valign: 'middle',
        fontSize: 8
      },
      indeferidoData: {
        alignment: 'center',
        color: '#75B8E6',
        valign: 'middle',
        fontSize: 8
      },
    }
  };
  return docDefinition;
};
