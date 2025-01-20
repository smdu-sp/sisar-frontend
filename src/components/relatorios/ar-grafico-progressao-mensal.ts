import { DateRange } from "@mui/icons-material";

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

const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outurbo', 'novembro', 'dezembro']

function gerarLinhasDados(data: { ano: number, mensal: number[] }) {
  let linha: { text?: string, style?: string, rowSpan?: number }[] = []
  let linhas: { text?: string, style?: string, rowSpan?: number }[][] = []
  let acc = 0

  // console.log("1: lista de meses", meses)
  // console.log("2: mês de janeiro aqui", meses[0])
  // console.log("3: objeto recebido aqui", data)
  // console.log("4: lista do objeto aqui", data.mensal)

  data.mensal.forEach((num, index) => {
    // console.log("5: itens da lista", num)
    console.log("6: index da lista", index)
    acc += num

    // console.log("8: acc aqui", acc)
    if (index === 0) {
      linha.push({ text: data.ano.toString(), rowSpan: 12, style: 'yearCell' });
    } else {
      linha.push({ text: data.ano.toString() });
    }
    linha.push({ text: meses[index] })
    linha.push({ text: num.toString(), style: 'monthlyAndAccCel' })
    linha.push({ text: acc.toString(), style: 'monthlyAndAccCel' })
    linhas.push(linha)
    linha = []
  })
  return linhas
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

            ],

            ...gerarLinhasDados(arrProgProct[0])

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
