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

type TableRowType = {
  text: string | number;
  style: string;
  rowSpan?: number
}[];

type TableType = {
  headerRows?: number;
  widths?: number[];
  body?: TableRowType[][]
}

type LayoutType = {
  vLineColor: string;
  hLineColor: (i: number) => string
}

type ObjectContent = {
  layout?: LayoutType;
  table?: TableType
}

const arrProgProct: LinhaDados[] = [
  {
    ano: 2018,
    jan: {
      mes: 'janeiro',
      mensal: 10,
      acc: 10
    },
    fev: {
      mes: 'fevereiro',
      mensal: 10,
      acc: 20
    },
    mar: {
      mes: 'março',
      mensal: 10,
      acc: 30
    },
    abr: {
      mes: 'abril',
      mensal: 10,
      acc: 40
    },
    mai: {
      mes: 'maio',
      mensal: 10,
      acc: 50
    },
    jun: {
      mes: 'junho',
      mensal: 10,
      acc: 60
    },
    jul: {
      mes: 'julho',
      mensal: 10,
      acc: 70
    },
    ago: {
      mes: 'agosto',
      mensal: 10,
      acc: 80
    },
    set: {
      mes: 'setembro',
      mensal: 10,
      acc: 90
    },
    out: {
      mes: 'outubro',
      mensal: 10,
      acc: 100
    },
    nov: {
      mes: 'novembro',
      mensal: 10,
      acc: 110
    },
    dez: {
      mes: 'dezembro',
      mensal: 10,
      acc: 120
    }
  },
  {
    ano: 2019,
    jan: {
      mes: 'janeiro',
      mensal: 10,
      acc: 10
    },
    fev: {
      mes: 'fevereiro',
      mensal: 10,
      acc: 20
    },
    mar: {
      mes: 'março',
      mensal: 10,
      acc: 30
    },
    abr: {
      mes: 'abril',
      mensal: 10,
      acc: 40
    },
    mai: {
      mes: 'maio',
      mensal: 10,
      acc: 50
    },
    jun: {
      mes: 'junho',
      mensal: 10,
      acc: 60
    },
    jul: {
      mes: 'julho',
      mensal: 10,
      acc: 70
    },
    ago: {
      mes: 'agosto',
      mensal: 10,
      acc: 80
    },
    set: {
      mes: 'setembro',
      mensal: 10,
      acc: 90
    },
    out: {
      mes: 'outubro',
      mensal: 10,
      acc: 100
    },
    nov: {
      mes: 'novembro',
      mensal: 10,
      acc: 110
    },
    dez: {
      mes: 'dezembro',
      mensal: 10,
      acc: 120
    }
  },
  {
    ano: 2020,
    jan: {
      mes: 'janeiro',
      mensal: 10,
      acc: 10
    },
    fev: {
      mes: 'fevereiro',
      mensal: 10,
      acc: 20
    },
    mar: {
      mes: 'março',
      mensal: 10,
      acc: 30
    },
    abr: {
      mes: 'abril',
      mensal: 10,
      acc: 40
    },
    mai: {
      mes: 'maio',
      mensal: 10,
      acc: 50
    },
    jun: {
      mes: 'junho',
      mensal: 10,
      acc: 60
    },
    jul: {
      mes: 'julho',
      mensal: 10,
      acc: 70
    },
    ago: {
      mes: 'agosto',
      mensal: 10,
      acc: 80
    },
    set: {
      mes: 'setembro',
      mensal: 10,
      acc: 90
    },
    out: {
      mes: 'outubro',
      mensal: 10,
      acc: 100
    },
    nov: {
      mes: 'novembro',
      mensal: 10,
      acc: 110
    },
    dez: {
      mes: 'dezembro',
      mensal: 10,
      acc: 120
    }
  },
  {
    ano: 2021,
    jan: {
      mes: 'janeiro',
      mensal: 10,
      acc: 10
    },
    fev: {
      mes: 'fevereiro',
      mensal: 10,
      acc: 20
    },
    mar: {
      mes: 'março',
      mensal: 10,
      acc: 30
    },
    abr: {
      mes: 'abril',
      mensal: 10,
      acc: 40
    },
    mai: {
      mes: 'maio',
      mensal: 10,
      acc: 50
    },
    jun: {
      mes: 'junho',
      mensal: 10,
      acc: 60
    },
    jul: {
      mes: 'julho',
      mensal: 10,
      acc: 70
    },
    ago: {
      mes: 'agosto',
      mensal: 10,
      acc: 80
    },
    set: {
      mes: 'setembro',
      mensal: 10,
      acc: 90
    },
    out: {
      mes: 'outubro',
      mensal: 10,
      acc: 100
    },
    nov: {
      mes: 'novembro',
      mensal: 10,
      acc: 110
    },
    dez: {
      mes: 'dezembro',
      mensal: 10,
      acc: 120
    }
  }, {
    ano: 2022,
    jan: {
      mes: 'janeiro',
      mensal: 10,
      acc: 10
    },
    fev: {
      mes: 'fevereiro',
      mensal: 10,
      acc: 20
    },
    mar: {
      mes: 'março',
      mensal: 10,
      acc: 30
    },
    abr: {
      mes: 'abril',
      mensal: 10,
      acc: 40
    },
    mai: {
      mes: 'maio',
      mensal: 10,
      acc: 50
    },
    jun: {
      mes: 'junho',
      mensal: 10,
      acc: 60
    },
    jul: {
      mes: 'julho',
      mensal: 10,
      acc: 70
    },
    ago: {
      mes: 'agosto',
      mensal: 10,
      acc: 80
    },
    set: {
      mes: 'setembro',
      mensal: 10,
      acc: 90
    },
    out: {
      mes: 'outubro',
      mensal: 10,
      acc: 100
    },
    nov: {
      mes: 'novembro',
      mensal: 10,
      acc: 110
    },
    dez: {
      mes: 'dezembro',
      mensal: 10,
      acc: 120
    }
  },
  {
    ano: 2023,
    jan: {
      mes: 'janeiro',
      mensal: 10,
      acc: 10
    },
    fev: {
      mes: 'fevereiro',
      mensal: 10,
      acc: 20
    },
    mar: {
      mes: 'março',
      mensal: 10,
      acc: 30
    },
    abr: {
      mes: 'abril',
      mensal: 10,
      acc: 40
    },
    mai: {
      mes: 'maio',
      mensal: 10,
      acc: 50
    },
    jun: {
      mes: 'junho',
      mensal: 10,
      acc: 60
    },
    jul: {
      mes: 'julho',
      mensal: 10,
      acc: 70
    },
    ago: {
      mes: 'agosto',
      mensal: 10,
      acc: 80
    },
    set: {
      mes: 'setembro',
      mensal: 10,
      acc: 90
    },
    out: {
      mes: 'outubro',
      mensal: 10,
      acc: 100
    },
    nov: {
      mes: 'novembro',
      mensal: 10,
      acc: 110
    },
    dez: {
      mes: 'dezembro',
      mensal: 10,
      acc: 120
    }
  },
  {
    ano: 2024,
    jan: {
      mes: 'janeiro',
      mensal: 10,
      acc: 10
    },
    fev: {
      mes: 'fevereiro',
      mensal: 10,
      acc: 20
    },
    mar: {
      mes: 'março',
      mensal: 10,
      acc: 30
    },
    abr: {
      mes: 'abril',
      mensal: 10,
      acc: 40
    },
    mai: {
      mes: 'maio',
      mensal: 10,
      acc: 50
    },
    jun: {
      mes: 'junho',
      mensal: 10,
      acc: 60
    },
    jul: {
      mes: 'julho',
      mensal: 10,
      acc: 70
    },
    ago: {
      mes: 'agosto',
      mensal: 10,
      acc: 80
    },
    set: {
      mes: 'setembro',
      mensal: 10,
      acc: 90
    },
    out: {
      mes: 'outubro',
      mensal: 10,
      acc: 100
    },
    nov: {
      mes: 'novembro',
      mensal: 10,
      acc: 110
    },
    dez: {
      mes: 'dezembro',
      mensal: 10,
      acc: 120
    }
  }
]


///////////////////////

export const getArGraficoProgressaoMensal = async (month: string, year: string) => {

  const docDefinition = {
    // content: [
    //   {text: 'Progressão AR Protocolados'},
    //   {text: '', style: 'insivibleLine'},
    //   {
    //     layout: {
    //      vLineColor:'#000000',
    //      hLineColor: (i: number) => {
    //       if ([0,1].includes(i)) return '#000000';
    //       return '#E0D8D3'
    //      }

    //     },
    //     table: {
    //       headerRows: 1,
    //       widths: [60, 130, 55, 130],
    //       body: [
    //         [
    //           { text: 'Ano', style: 'header', layout: 'noBorders'  },
    //           { text: 'Mês', style: 'header', layout: 'noBorders' },
    //           { text: 'Mensal', style: 'header', layout: 'noBorders' },
    //           { text: 'Acumulado', style: 'header', layout: 'noBorders' }
    //         ],

    //         [
    //           {text: '2025', rowSpan: 12, style: 'yearCell'},
    //           {text: 'Janeiro'},
    //           {text: '100', style: 'monthlyAndAccCel'},
    //           {text: '100', style: 'monthlyAndAccCel'},
    //         ],

    //         [
    //           { text: '2025'},
    //           { text: 'Fevereiro'},
    //           { text: '100', style: 'monthlyAndAccCel' },
    //           { text: '100', style: 'monthlyAndAccCel' }
    //         ],
    //         [
    //           { text: '2025'},
    //           { text: 'Março'},
    //           { text: '100', style: 'monthlyAndAccCel' },
    //           { text: '100', style: 'monthlyAndAccCel' }
    //         ],
    //         [
    //           { text: '2025'},
    //           { text: 'Abril'},
    //           { text: '100', style: 'monthlyAndAccCel' },
    //           { text: '100', style: 'monthlyAndAccCel' }
    //         ],
    //         [
    //           { text: '2025'},
    //           { text: 'Maio'},
    //           { text: '100', style: 'monthlyAndAccCel' },
    //           { text: '100', style: 'monthlyAndAccCel' }
    //         ],
    //         [
    //           { text: '2025'},
    //           { text: 'Junho'},
    //           { text: '100', style: 'monthlyAndAccCel' },
    //           { text: '100', style: 'monthlyAndAccCel' }
    //         ],
    //         [
    //           { text: '2025'},
    //           { text: 'Julho'},
    //           { text: '100', style: 'monthlyAndAccCel' },
    //           { text: '100', style: 'monthlyAndAccCel' }
    //         ],
    //         [
    //           { text: '2025'},
    //           { text: 'Agosto'},
    //           { text: '100', style: 'monthlyAndAccCel' },
    //           { text: '100', style: 'monthlyAndAccCel' }
    //         ],
    //         [
    //           { text: '2025'},
    //           { text: 'Setembro'},
    //           { text: '100', style: 'monthlyAndAccCel' },
    //           { text: '100', style: 'monthlyAndAccCel' }
    //         ],
    //         [
    //           { text: '2025'},
    //           { text: 'Outubro'},
    //           { text: '100', style: 'monthlyAndAccCel' },
    //           { text: '100', style: 'monthlyAndAccCel' }
    //         ],
    //         [
    //           { text: '2025'},
    //           { text: 'Novembro'},
    //           { text: '100', style: 'monthlyAndAccCel' },
    //           { text: '100', style: 'monthlyAndAccCel' }
    //         ],
    //         [
    //           { text: '2025'},
    //           { text: 'Dezembro'},
    //           { text: '100', style: 'monthlyAndAccCel' },
    //           { text: '100', style: 'monthlyAndAccCel' }
    //         ]
    //       ]
    //     }
    //   },
    // ],

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
