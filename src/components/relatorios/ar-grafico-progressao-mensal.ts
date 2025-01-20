type MesDadosType = {
  mes: string;
  mensal: number;
  acc: number;
};

type LinhasTabelasDadosType = {
  ano: number;
  jan: MesDadosType;
  fev: MesDadosType;
  mar: MesDadosType;
  abr: MesDadosType;
  mai: MesDadosType;
  jun: MesDadosType;
  jul: MesDadosType;
  ago: MesDadosType;
  set: MesDadosType;
  out: MesDadosType;
  nov: MesDadosType;
  dez: MesDadosType;
};

type LinhaTabelaType = {
  text: string | number;
  style: string;
  rowSpan?: number
}[];

type TableType = {
  headerRows?: number;
  widths?: number[];
  body?: LinhaTabelaType[][]
}

type LayoutType = {
  vLineColor: string;
  hLineColor: (i: number) => string
}

type ObjectContent = {
  layout?: LayoutType;
  table?: TableType
}

function gerarLinhasDados(data: LinhasTabelasDadosType): LinhaTabelaType[][] {
  const linhas: LinhaTabelaType[] = [];
  const body: LinhaTabelaType[][] = [];

  for (const key in data) {
    if (key === 'ano') {
      // Ignora a chave 'ano' e adiciona na linha como a primeira célula
      linhas.push({ text: data[key], rowSpan: 12, style: 'yearCell' });
    } else {
      // Para as outras chaves (jan, fev, mar, etc.), acessa 'mes', 'mensal' e 'acc'
      const monthData = data[key];

      linhas.push({ text: monthData.mes, style: 'monthlyAndAccCel' });
      linhas.push({ text: monthData.mensal, style: 'monthlyAndAccCel' });
      linhas.push({ text: monthData.acc, style: 'monthlyAndAccCel' });
    }
  }

  body.push(linhas); // Adiciona todas as linhas na estrutura 'body'
  return body;
}



///////////////////////

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
          headerRows: 1,
          widths: [60, 130, 55, 130],
          body: [
            [
              { text: 'Ano', style: 'header', layout: 'noBorders' },
              { text: 'Mês', style: 'header', layout: 'noBorders' },
              { text: 'Mensal', style: 'header', layout: 'noBorders' },
              { text: 'Acumulado', style: 'header', layout: 'noBorders' },

            ]

          ]
        }
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
