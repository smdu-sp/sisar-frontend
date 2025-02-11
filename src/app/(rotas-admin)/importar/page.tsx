'use client'

import Content from '@/components/Content';
import { AlertsContext } from '@/providers/alertsProvider';
import { IInicial } from '@/types/inicial/inicial.dto';
import { Box, Button, Card, FormControl, FormLabel, Option, Select, SvgIcon, styled } from '@mui/joy';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import * as xlsx from 'xlsx';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function Importar() {
  const [ arquivo, setArquivo ] = useState<File | null>(null);
  const [ enviandoArquivo, setEnviandoArquivo ] = useState<boolean>(false);
  const { setAlert } = useContext(AlertsContext);
  const router = useRouter();

  //   function excelDateToJSDate(serial: number) {
  //     var utc_days  = Math.floor(serial - 25569);
  //     var utc_value = utc_days * 86400;                                        
  //     var date_info = new Date(utc_value * 1000);

  //     var fractional_day = serial - Math.floor(serial) + 0.0000001;

  //     var total_seconds = Math.floor(86400 * fractional_day);

  //     var seconds = total_seconds % 60;

  //     total_seconds -= seconds;

  //     var hours = Math.floor(total_seconds / (60 * 60));
  //     var minutes = Math.floor(total_seconds / 60) % 60;

  //     return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  //  }
    
  function enviarArquivo(): void {
    if (!arquivo) return alert("Suba um arquivo válido!");
    setEnviandoArquivo(true);
    const reader = new FileReader();
    reader.readAsArrayBuffer(arquivo);
    reader.onload = (e) => {
      if (e.target){
        const data = e.target?.result;
        const wb = xlsx.read(data);
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        var linhas = xlsx.utils.sheet_to_json(ws, { header: 1 });
        linhas = linhas.splice(9, 10);
        const processos: Partial<IInicial>[] = [];
        linhas.map((linha: any) => {
          processos.push({
            id: parseInt(linha[3]),
            obs: linha[1],
            sei: linha[2].length === 19 ? linha[2].length : '',
            processo_fisico: linha[2].length === 16 ? linha[2].length : '',
            tipo_requerimento: 0,
            requerimento: '',
            data_protocolo: new Date(Date.UTC(0, 0, linha[8] - 1)),
            decreto: false,
            
          })          
        });
        setEnviandoArquivo(false);
        // cadastrosServices.buscarLista(sqls)
        //   .then((response: cadastrosServices.IListaSql[]) => {
        //     setListaSqlsResposta(response);
        //     console.log(response);
        //     setEnviandoArquivo(false);
        //     setAlert('Sucesso!', 'Busca de lista de SQLs realizada com sucesso!', 'success', 5000, Check);
        //     setArquivo(null);
        //   })
        //   .catch((error) => {
        //     setEnviandoArquivo(false);
        //     setAlert('Erro!', 'Erro ao buscar lista de SQLs!', 'danger', 5000, DeleteForever);
        //   })
        //   .finally(() => {
        //     setEnviandoArquivo(false);
        //   });
      }
    };
  }

  return (
    <Content 
      titulo='Importar'
      breadcrumbs={[{
        label: 'Importar',
        href: ''
      }]}
    >
      <Card
        size='lg'
        variant='outlined'
        sx={{
          width: { xs: '100%', sm: '70%', md: '50%' }
        }}
      >
        <FormControl>
          <FormLabel>Tipo de Arquivo</FormLabel>
          <Select>
            <Option value=''>Distribuição</Option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Arquivo</FormLabel>
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"
            color="neutral"
            sx={{
              flex: 1,
              width: { xs: '100%', sm: '70%', md: '50%', xl: '30%' }
            }}
            startDecorator={
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </SvgIcon>
            }
          >
            {arquivo ? arquivo.name : 'Escolher arquivo'}
            <VisuallyHiddenInput type="file" name="lista" multiple={false} accept=".csv, .xls, .xlsx, .xlsb"
              onChange={(event) => {
                if (event.target.files) {
                  setArquivo(event.target.files[0]);
                }
              }}
            />
          </Button>
        </FormControl>
        <Box
          width={'full'}
          display={'flex'}
          justifyContent={'flex-end'}
        >
          <Button
            size='sm'
            variant='plain'
            color='neutral'
            onClick={() => router.back()}
            sx={{ mr: 1, borderRadius: 4 }}
          >
            Cancelar
          </Button>
          <Button
            size='sm'
            loading={enviandoArquivo}
            loadingPosition='start'
            onClick={enviarArquivo}
            sx={{ borderRadius: 4 }}
          >
            { enviandoArquivo ? 'Salvando...' : 'Salvar' }
          </Button>
        </Box>
      </Card>
    </Content>
  );
}
