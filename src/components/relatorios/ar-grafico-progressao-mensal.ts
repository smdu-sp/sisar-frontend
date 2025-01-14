// Definindo o tipo dos dados que serão passados para a função
type DadosMes = {
  mes: string;
  mensal: number;
  acc: number;
};

type LinhaDados = {
  ano: number;
  jan: DadosMes;
  fev: DadosMes;
  mar: DadosMes;
  abr: DadosMes;
  mai: DadosMes;
  jun: DadosMes;
  jul: DadosMes;
  ago: DadosMes;
  set: DadosMes;
  out: DadosMes;
  nov: DadosMes;
  dez: DadosMes;
};

// Função para gerar as linhas dos dados com base no padrão de estilo solicitado
function gerarLinhaDados(data: LinhaDados): { text: string | number, style: string }[][] {
  return [
    [
      { text: `${data.ano}`, style: 'yearCell' },
      { text: data.jan.mes, style: 'monthCell' },
      { text: data.jan.mensal, style: 'monthlyAndAccCel' },
      { text: data.jan.acc, style: 'monthlyAndAccCel' },

      { text: data.fev.mes, style: 'monthCell' },
      { text: data.fev.mensal, style: 'monthlyAndAccCel' },
      { text: data.fev.acc, style: 'monthlyAndAccCel' },

      { text: data.mar.mes, style: 'monthCell' },
      { text: data.mar.mensal, style: 'monthlyAndAccCel' },
      { text: data.mar.acc, style: 'monthlyAndAccCel' },

      { text: data.abr.mes, style: 'monthCell' }, 
      { text: data.abr.mensal, style: 'monthlyAndAccCel' },  
      { text: data.abr.acc, style: 'monthlyAndAccCel' },

      { text: data.mai.mes, style: 'monthCell' }, 
      { text: data.mai.mensal, style: 'monthlyAndAccCel' },
      { text: data.mai.acc, style: 'monthlyAndAccCel' },

      { text: data.jun.mes, style: 'monthCell' },
      { text: data.jun.mensal, style: 'monthlyAndAccCel' },
      { text: data.jun.acc, style: 'monthlyAndAccCel' },

      { text: data.jul.mes, style: 'monthCell' },
      { text: data.jul.mensal, style: 'monthlyAndAccCel' },
      { text: data.jul.acc, style: 'monthlyAndAccCel' },

      { text: data.ago.mes, style: 'monthCell' },
      { text: data.ago.mensal, style: 'monthlyAndAccCel' },
      { text: data.ago.acc, style: 'monthlyAndAccCel' },

      { text: data.set.mes, style: 'monthCell' },
      { text: data.set.mensal, style: 'monthlyAndAccCel' },
      { text: data.set.acc, style: 'monthlyAndAccCel' },

      { text: data.out.mes, style: 'monthCell' },
      { text: data.out.mensal, style: 'monthlyAndAccCel' },
      { text: data.out.acc, style: 'monthlyAndAccCel' },

      { text: data.nov.mes, style: 'monthCell' },
      { text: data.nov.mensal, style: 'monthlyAndAccCel' },
      { text: data.nov.acc, style: 'monthlyAndAccCel' },

      { text: data.dez.mes, style: 'monthCell' },
      { text: data.dez.mensal, style: 'monthlyAndAccCel' },
      { text: data.dez.acc, style: 'monthlyAndAccCel' },
    ],
  ];
}


export const getArGraficoProgressaoMensal = async (month: string, year: string) => {

  const docDefinition = {
    pageOrientation: 'landscape',
    content: [
      { text: 'Progressão AR Protocolados' },
      { text: '', style: 'insivibleLine' },

      // Itera sobre os anos e cria uma tabela para cada um
      ...arrProgProct.map((obj) => ({
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
              { text: `${obj.ano}`, style: 'yearCell' },
              { text: mes },
              { text: mensal, style: 'monthlyAndAccCel' },
              { text: acumulado, style: 'monthlyAndAccCel' }

          ]
        }
      })),
    ],
    styles: {
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
