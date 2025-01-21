const arrProgProct = [
  {
    ano: 2018,
    mensal: [7, 2, 0, 5, 12, 17, 10, 1, 9, 44, 2]
  },
  {
    ano: 2019,
    mensal: [7, 2, 0, 5, 12, 17, 10, 1, 9, 44, 2]
  },
  {
    ano: 2020,
    mensal: [7, 2, 0, 5, 12, 17, 10, 1, 9, 44, 2]
  },
  {
    ano: 2021,
    mensal: [7, 2, 0, 5, 12, 17, 10, 1, 9, 44, 2]
  },
  {
    ano: 2022,
    mensal: [7, 2, 0, 5, 12, 17, 10, 1, 9, 44, 2]
  },
  {
    ano: 2023,
    mensal: [7, 2, 0, 5, 12, 17, 10, 1, 9, 44, 2]
  },
  {
    ano: 2024,
    mensal: [7, 2, 0, 5, 12, 17, 10, 1, 9, 44, 2]
  }
]


function gerarLinhasDados(data: { ano: number, mensal: number[] }) {
  const meses = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outurbo',
    'novembro',
    'dezembro'
  ]
  let linha: { text?: string, style?: string, layout?: string }[] = []
  let linhas: { text?: string, style?: string, layout?: string }[][] = [
    [
      { text: 'Ano', style: 'header', layout: 'noBorders' },
      { text: 'Mês', style: 'header', layout: 'noBorders' },
      { text: 'Mensal', style: 'header', layout: 'noBorders' },
      { text: 'Acumulado', style: 'header', layout: 'noBorders' },

    ]
  ]
  let acc = 0

  data.mensal.forEach((num, index) => {
    acc += num

    linha.push({ text: data.ano.toString() });
    linha.push({ text: meses[index] })
    linha.push({ text: num.toString(), style: 'monthlyAndAccCel' })
    linha.push({ text: acc.toString(), style: 'monthlyAndAccCel' })
    linhas.push(linha)
    linha = []
  })
  return linhas
}



function gerarCabecalhoDados() {
  return {
    headerRows: 1,
    widths: [60, 130, 55, 130],
  }
}

function gerarTabelaDados(data: { ano: number, mensal: number[] }) {
  return {
    ...gerarCabecalhoDados(),
    body: [
      ...gerarLinhasDados(data)
    ]
  }
}



export const getArGraficoProgressaoMensal = async (month: string, year: string) => {

  const docDefinition = {
    content: [
      { text: 'Progressão AR Protocolados' },
      { text: '', style: 'insivibleLine' },
      {
        layout: {
          vLineColor: '#000000',
          hLineColor: (i: number) => {
            if ([0, 1].includes(i)) return '#000000';
            return '#E0D8D3'
          }

        },
        table: {
          // headerRows: 1,
          // widths: [60, 130, 55, 130],

          /////


          // ...gerarCabecalhoDados(),
          // body: [
          //   ...gerarLinhasDados(arrProgProct[0])
          // ]

          ...gerarTabelaDados(arrProgProct[0])
        },
      },
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
