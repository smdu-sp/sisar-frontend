import { AlignHorizontalCenter, Style } from "@mui/icons-material";
import { text } from "stream/consumers";

export const getArGraficoProgressaoMensal = async (month: string, year: string) => {
  const docDefinition = {
    content: [
      {text: 'Progressão AR Protocolados'},
      {text: '', style: 'insivibleLine'},
      {
        layout: {
         vLineColor:'#000000',
         hLineColor: '#E0D8D3'

        },
        table: {
          headerRows: 1,
          widths: [60, 130, 55, 130],
          body: [
            [
              { text: 'Ano', style: 'header'  },
              { text: 'Mês', style: 'header' },
              { text: 'Mensal', style: 'header' },
              { text: 'Acumulado', style: 'header' }
            ],

            [
              {text: '2025', rowSpan:12, style: 'yearCell'},
              {text: 'Janeiro'},
              {text: '100', style: 'monthlyAndAccCel'},
              {text: '100', style: 'monthlyAndAccCel'},
            ],

            [
              { text: '2025'},
              { text: 'Fevereiro'},
              { text: '100', style: 'monthlyAndAccCel' },
              { text: '100', style: 'monthlyAndAccCel' }
            ],
            [
              { text: '2025'},
              { text: 'Março'},
              { text: '100', style: 'monthlyAndAccCel' },
              { text: '100', style: 'monthlyAndAccCel' }
            ],
            [
              { text: '2025'},
              { text: 'Abril'},
              { text: '100', style: 'monthlyAndAccCel' },
              { text: '100', style: 'monthlyAndAccCel' }
            ],
            [
              { text: '2025'},
              { text: 'Maio'},
              { text: '100', style: 'monthlyAndAccCel' },
              { text: '100', style: 'monthlyAndAccCel' }
            ],
            [
              { text: '2025'},
              { text: 'Junho'},
              { text: '100', style: 'monthlyAndAccCel' },
              { text: '100', style: 'monthlyAndAccCel' }
            ],
            [
              { text: '2025'},
              { text: 'Julho'},
              { text: '100', style: 'monthlyAndAccCel' },
              { text: '100', style: 'monthlyAndAccCel' }
            ],
            [
              { text: '2025'},
              { text: 'Agosto'},
              { text: '100', style: 'monthlyAndAccCel' },
              { text: '100', style: 'monthlyAndAccCel' }
            ],
            [
              { text: '2025'},
              { text: 'Setembro'},
              { text: '100', style: 'monthlyAndAccCel' },
              { text: '100', style: 'monthlyAndAccCel' }
            ],
            [
              { text: '2025'},
              { text: 'Outubro'},
              { text: '100', style: 'monthlyAndAccCel' },
              { text: '100', style: 'monthlyAndAccCel' }
            ],
            [
              { text: '2025'},
              { text: 'Novembro'},
              { text: '100', style: 'monthlyAndAccCel' },
              { text: '100', style: 'monthlyAndAccCel' }
            ],
            [
              { text: '2025'},
              { text: 'Dezembro'},
              { text: '100', style: 'monthlyAndAccCel' },
              { text: '100', style: 'monthlyAndAccCel' }
            ]
          ]
        }
      }
    ],
    styles: {
      classe_teste: {
        color: 'blue'
      },
      header: {
        alignment: 'center',
        text: 'bold',
        fontSize: 12,
        vLineColor:'#000000'
      },
      yearCell: {
        alignment: 'center',
        margin: [0, 110, 0, 0]

      },
      monthlyAndAccCel: {
        alignment: 'right'
      },
      monthlyCel: {
        color: 'green'
      },
      insivibleLine: {
        margin: [0, 10, 0, 10]
      }
      
    }
  };
  return docDefinition;
};
