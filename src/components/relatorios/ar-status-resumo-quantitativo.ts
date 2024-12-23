// APROVA RÁPIDO STATUS E RESUMO QUANTITATIVO

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
export const getArStatusResumoQuantitativoPdf = async (month: string, year: string) => {
  const quantitativo: IAprovaRapidoQuantitativoResponse = await getRelatorioArQuantitativo(month, year);
  if (!quantitativo) throw new Error("Não existe relatório na variável quantitativo - PDF");
  const docDefinition = {
    content: [
      { text: 'APROVA RÁPIDO', style: 'header' },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto'], // Define as larguras das colunas
          body: [
            [
              { text: 'TOTAL DE PROCESSOS', style: 'tableHeader' },
              { text: quantitativo?.total, style: 'tableData' }
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
        } // Adiciona margem inferior para espaço entre tabelas
      },

      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto'], // Define as larguras das colunas
          body: [
            [
              { text: 'SMUL', style: 'tableHeader' },
              { text: quantitativo?.em_analise.smul.quantidade, style: 'tableData' }
            ],
            [
              { text: 'GRAPROEM', style: 'tableHeader' },
              { text: quantitativo?.em_analise.graproem.quantidade, style: 'tableData' }
            ],
            [
              { text: 'TOTAL PARCIAL', style: 'tableHeader' },
              { text: quantitativo?.em_analise.total_parcial, style: 'tableData' }
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
              { text: '1. Em Análise', style: 'tableUnidadesHeader' },
              {
                table: {
                  headerRows: 1,
                  widths: ['80%', '*'],
                  body: [
                    [
                      { text: 'SMUL', style: 'tableUnidades' },
                      { text: quantitativo.em_analise.smul.quantidade, style: 'tableUnidadesData' },
                    ],
                    [
                      { text: 'GRAPROEM', style: 'tableUnidades' },
                      { text: quantitativo.em_analise.graproem.quantidade, style: 'tableUnidadesData' },
                    ],
                    [
                      { text: 'Total parcial', style: 'tableUnidades' },
                      { text: quantitativo.em_analise.total_parcial, style: 'tableUnidades' }
                    ]
                  ],
                },
                border: [false, false, false, false], // Sem borda nas quatro direções externas
              },
            ],
            [
              // Dados de quantidade de processos deferidos
              { text: '2. Deferidos', style: 'tableUnidades' },
              {
                table: {
                  headerRows: 1,
                  widths: ['80%', '*'],
                  body: [
                    [
                      { text: 'SMUL', style: 'tableUnidades' },
                      { text: quantitativo.deferidos.smul.quantidade, style: 'tableUnidadesData' },
                    ],
                    [
                      { text: 'GRAPROEM', style: 'tableUnidades' },
                      { text: quantitativo.deferidos.graproem.quantidade, style: 'tableUnidadesData' },
                    ],
                    [
                      { text: 'Total parcial', style: 'tableUnidades' },
                      { text: quantitativo.deferidos.total_parcial, style: 'tableUnidades' }
                    ]
                  ],
                },
                border: [false, false, false, false], // Sem borda nas quatro direções externas
              },
            ],
            [
              // Dados de quantidade de processos indeferidos
              { text: '3. Indeferidos', style: 'tableUnidades' },
              {
                table: {
                  headerRows: 1,
                  widths: ['80%', '*'],
                  body: [
                    [
                      { text: 'SMUL', style: 'tableUnidades' },
                      { text: quantitativo.indeferidos.smul.quantidade, style: 'tableUnidadesData' },
                    ],
                    [
                      { text: 'GRAPROEM', style: 'tableUnidades' },
                      { text: quantitativo.indeferidos.graproem.quantidade, style: 'tableUnidadesData' },
                    ],
                    [
                      { text: 'Total parcial', style: 'tableUnidades' },
                      { text: quantitativo.indeferidos.total_parcial, style: 'tableUnidades' }
                    ],
                    [
                      { text: 'Total parcial', style: 'tableUnidades' },
                      { text: quantitativo.indeferidos.total_parcial, style: 'tableUnidades' }
                    ]
                  ],
                },
                border: [false, false, false, false], // Sem borda nas quatro direções externas
              },
            ],
            [
              { text: '4. Via Ordinária a Pedido do Interessado', style: 'tableUnidades' },
              { text: quantitativo?.admissiveis, style: 'tableData' }
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
          widths: ['auto', '*', 'auto'], // Define as larguras das colunas
          body: [
            [
              { text: 'PROCESSO', style: 'tableProcessoHeader' },
              { text: 'STATUS', style: 'tableProcessoHeader' },
              { text: 'DESCRIÇÃO DE STATUS', style: 'tableProcessoHeader' }
            ],

            // Dados de admissivel
            ...quantitativo?.admissiveis_dados?.map((a: any) => [
              { text: a.inicial?.sei || a.inicial?.processo_fisico || a.inicial?.aprova_digital , style: 'admissivelData' },
              {
                text: (() => {
                  switch (a.inicial.status) {
                    case 0: return 'Em Análise';
                    case 1: return 'Admissível';
                    case 2: return 'Deferido';
                    case 3: return 'Indeferido';
                    default: return 'Status Desconhecido';
                  }
                })(),
                style: 'admissivelData'
              },
              { text: a.inicial?.obs, style: 'admissivelData' }
            ]),

            // Dados de processos em análise
            ...quantitativo?.em_analise_dados?.map((a: any) => [
              { text: a.inicial?.sei || a.inicial?.processo_fisico || a.inicial?.aprova_digital, style: 'analiseData' },
              {
                text: (() => {
                  switch (a.inicial.status) {
                    case 0: return 'Em Análise';
                    case 1: return 'Admissível';
                    case 2: return 'Deferido';
                    case 3: return 'Indeferido';
                    default: return 'Status Desconhecido';
                  }
                })(),
                style: 'analiseData'
              },
              { text: a.inicial?.obs, style: 'analiseData' }
            ]),

            // Dados de processos inadimissíveis
            ...quantitativo?.inadmissiveis_dados?.map((a: any) => [
              { text: a.inicial?.sei || a.inicial?.processo_fisico || a.inicial?.aprova_digital, style: 'inadimissivelData' },
              {
                text: (() => {
                  switch (a.inicial.status) {
                    case 0: return 'Em Análise';
                    case 1: return 'Admissível';
                    case 2: return 'Deferido';
                    case 3: return 'Indeferido';
                    default: return 'Status Desconhecido';
                  }
                })(),
                style: 'inadimissivelData'
              },
              { text: a.inicial?.obs, style: 'inadimissivelData' }
            ])
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

      // Sessão da tabela de unidades
      tableUnidadesHeader: {
        marginBottom: 10
      },
      tableUnidades: {
      },
      tableUnidadesData: {
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
        color: 'lightblue',
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
      admissivelData: {
        alignment: 'center',
        color: 'darkblue',
        valign: 'middle',
        fontSize: 8
      },
      analiseData: {
        alignment: 'center',
        color: 'orange',
        valign: 'middle',
        fontSize: 8
      },
      inadimissivelData: {
        alignment: 'center',
        color: 'red',
        valign: 'middle',
        fontSize: 8
      }
    }
  };
  return docDefinition;
};
