export const getArGraficoProgressaoMensal = async (month: string, year: string) => {
  const docDefinition = {
    content: [
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto', 'auto'],
          body: [
            [
              { text: 'ano' },
              { text: 'mês' },
              { text: 'mensal' },
              { text: 'acumulado' }
            ],

            [
              {text: '2025', rowSpan:12},
              'Janeiro',
              '100',
              '100'
            ],

            ['2025', 'Fevereiro', '100', '100'],
            ['2025', 'Março', '100', '100'],
            ['2025', 'Abril', '100', '100'],
            ['2025', 'Maio', '100', '100'],
            ['2025', 'Junho', '100', '100'],
            ['2025', 'Julho', '100', '100'],
            ['2025', 'Agosto', '100', '100'],
            ['2025', 'Setembro', '100', '100'],
            ['2025', 'Outubro', '100', '100'],
            ['2025', 'Novembro', '100', '100'],
            ['2025', 'Dezembro', '100', '100'],
          ]
        }
      }
    ],
    styles: {
      classe_teste: {
        color: 'blue'
      }
    }
  };
  return docDefinition;
};
