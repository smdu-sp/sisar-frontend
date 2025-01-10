export const getArGraficoProgressaoMensal = async (month: string, year: string) => {
  const anos = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

  const docDefinition = {
    content: [
      { text: 'Progressão AR Protocolados' },
      { text: '', style: 'insivibleLine' },

      // Itera sobre os anos e cria uma tabela para cada um
      ...anos.map((ano) => ({
        layout: {
          vLineColor: '#000000',
          hLineColor: (i: number) => {
            if ([0, 1].includes(i)) return '#000000';
            return '#E0D8D3';
          }
        },
        table: {
          headerRows: 1,
          widths: [60, 130, 55, 130],
          body: [
            [
              { text: 'Ano', style: 'header', layout: 'noBorders' },
              { text: 'Mês', style: 'header', layout: 'noBorders' },
              { text: 'Mensal', style: 'header', layout: 'noBorders' },
              { text: 'Acumulado', style: 'header', layout: 'noBorders' }
            ],

            // Meses são fixos, mas o ano será dinâmico
            ...[
              { mes: 'Janeiro', mensal: '100', acumulado: '100' },
              { mes: 'Fevereiro', mensal: '100', acumulado: '100' },
              { mes: 'Março', mensal: '100', acumulado: '100' },
              { mes: 'Abril', mensal: '100', acumulado: '100' },
              { mes: 'Maio', mensal: '100', acumulado: '100' },
              { mes: 'Junho', mensal: '100', acumulado: '100' },
              { mes: 'Julho', mensal: '100', acumulado: '100' },
              { mes: 'Agosto', mensal: '100', acumulado: '100' },
              { mes: 'Setembro', mensal: '100', acumulado: '100' },
              { mes: 'Outubro', mensal: '100', acumulado: '100' },
              { mes: 'Novembro', mensal: '100', acumulado: '100' },
              { mes: 'Dezembro', mensal: '100', acumulado: '100' },
            ].map(({ mes, mensal, acumulado }) => [
              { text: `${ano}`, style: 'yearCell' },
              { text: mes },
              { text: mensal, style: 'monthlyAndAccCel' },
              { text: acumulado, style: 'monthlyAndAccCel' }
            ])
          ]
        }
      })),
    ],
    styles: {
      classe_teste: {
        color: 'blue'
      },
      header: {
        alignment: 'center',
        text: 'bold',
        fontSize: 12,
        vLineColor: '#000000'
      },
      yearCell: {
        alignment: 'center',
        margin: [0, 110, 0, 0]
      },
      monthlyAndAccCel: {
        alignment: 'right'
      },
      insivibleLine: {
        margin: [0, 10, 0, 10]
      }
    }
  };

  return docDefinition;
};
