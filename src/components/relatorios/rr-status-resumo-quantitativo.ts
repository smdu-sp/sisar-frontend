// REQUALIFICA RÁPIDO STATUS E RESUMO QUANTITATIVO

import * as relatorioService from '@/shared/services/relatorios/relatorio.service';

// Modelo XLSX
export const getRelatorioRrQuantitativo = async (month: string, year: string): Promise<relatorioService.IQuantitativoResponse> => {
  const relatorio: relatorioService.IQuantitativoResponse = await relatorioService.getRelatorioReqRapido(month, year);
  if (!relatorio) throw new Error("Não foi possível buscar o reltório");
  return relatorio;
};

const smulData = async (quantitativo: relatorioService.IQuantitativoResponse): Promise<{ Key: string, Value: number }[]> => {
  if (quantitativo == null || quantitativo == undefined) throw new Error('Não foi possível buscar o relatório');
  if (!quantitativo.em_analise.smul.data.length || quantitativo.em_analise.smul.data.length < 1) {
    return [{ Key: "", Value: 0 }]
  }
  return quantitativo.em_analise.smul.data.map((item: { nome: string, count: number }) => ({
    Key: item.nome,
    Value: item.count
  }));
}

const graproemData = async (quantitativo: relatorioService.IQuantitativoResponse): Promise<{ Key: string, Value: number }[]> => {
  if (quantitativo == null || quantitativo == undefined) throw new Error('Não foi possível buscar o relatório');
  if (!quantitativo.em_analise.graproem.data.length || quantitativo.em_analise.graproem.data.length < 1) {
    return [{ Key: "", Value: 0 }]
  }
  return quantitativo.em_analise.graproem.data.map((item: { nome: string, count: number }) => ({
    Key: item.nome,
    Value: item.count
  }));
}

export const getRrQunatitativoXlsx = async (month: string, year: string): Promise<{ Key: string, Value: any }[]> => {
  const quantitativo: relatorioService.IQuantitativoResponse = await getRelatorioRrQuantitativo(month, year);
  if (!quantitativo) throw new Error("Não foi possível buscar o reltório");
  return [
    { Key: '', Value: '' },
    { Key: 'Requalifica', Value: 'Rápido' },
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
export const getRrStatusResumoQuantitativoPdf = async (month: string, year: string) => {
  const quantitativo: relatorioService.IQuantitativoResponse = await getRelatorioRrQuantitativo(month, year);
  if (!quantitativo) throw new Error("Não existe relatório na variável quantitativo");
  const docDefinition = {
    content: [
      { text: 'REQUALIFICA RÁPIDO', style: 'header' },
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
        } // Adiciona margem superior para espaço entre tabelas
      }
    ],
    styles: {
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
      }
    }
  };
  return docDefinition;
};
