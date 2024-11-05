'use client'

import Content from '@/components/Content';
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { Box, Button, Card, CardContent, Divider, FormControl, FormLabel, Option, Select, Typography } from '@mui/joy';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { AlertsContext } from '@/providers/alertsProvider';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const jsonData = {
  "total": 20,
  "analise": 0,
  "inadimissiveis": 1,
  "admissiveis": 19,
  "data_gerado": "16/10/2024",
  "em_analise": {
    "smul": {
      "quantidade": 3,
      "data": [
        {
          "nome": "Unidade",
          "count": 1
        },
        {
          "nome": "teste 2",
          "count": 2
        },
        {
          "nome": "teste 3",
          "count": 3
        },
        {
          "nome": "teste 4",
          "count": 4
        }
      ]
    },
    "graproem": {
      "quantidade": 1,
      "data": [
        {
          "nome": "Unidade",
          "count": 1
        }
      ]
    },
    "total_parcial": 4
  }
};

export default function ExportXlsx() {
  const [fileType, setFileType] = useState<'XLSX' | 'PDF'>('XLSX');
  const [date, setDate] = useState<Date | undefined>();
  const [construcao, setConstrucao] = useState(false);
  const { setAlert } = React.useContext(AlertsContext);

  const smulData: { Key: string, Value: number }[] = jsonData
    .em_analise.smul.data.map((item: { nome: string, count: number }) => ({
      Key: item.nome,
      Value: item.count
    }));

  const graproemData: { Key: string, Value: number }[] = jsonData
    .em_analise.graproem.data.map((item: { nome: string, count: number }) => ({
      Key: item.nome,
      Value: item.count
    }));

  const mainData: { Key: string, Value: any }[] = [
    { Key: '', Value: '' },
    { Key: 'Dados totais', Value: '' },
    { Key: 'Total', Value: jsonData.total },
    { Key: 'Análise', Value: jsonData.analise },
    { Key: 'Inadimissíveis', Value: jsonData.inadimissiveis },
    { Key: 'Admissíveis', Value: jsonData.admissiveis },
    { Key: 'Data Gerado', Value: jsonData.data_gerado },
    { Key: '', Value: '' },
    { Key: 'Em Analise', Value: '' },
    { Key: 'SMUL', Value: jsonData.em_analise.smul.quantidade },
    { Key: 'GRAPROEM', Value: jsonData.em_analise.graproem.quantidade },
    { Key: 'Total Parcial', Value: jsonData.em_analise.total_parcial },
    { Key: '', Value: '' },
    { Key: 'SMUL', Value: '' },
    ...smulData,
    { Key: '', Value: '' },
    { Key: 'Graproem', Value: '' },
    ...graproemData
  ];

  const getRelatorioDate = (): string => `${date?.toString().split(' ')[1]}-${date?.toString().split(' ')[3]}`;

  const exportToXlsx = (): void => {
    const worksheetMain: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mainData);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheetMain, 'Dados');
    XLSX.writeFile(workbook, `Relatorio-${getRelatorioDate()}.xlsx`);
  };

  const exportFile = (): void => {
    try {
      if (date === undefined)
        throw new Error(' Data não selecionada');
      fileType === 'PDF' ? gerarPDF() : exportToXlsx(); 
    } catch (error) {
      console.error(error);
      setAlert(`${error}`, ' ', 'danger', 3000, WarningAmberRoundedIcon);
    }
  }

  const gerarPDF = () => {
    // Define a estrutura do PDF
    const docDefinition = {
      content: [
        { text: 'APROVA RÁPIDO', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto'], // Define as larguras das colunas
            body: [
              [
                { text: 'TOTAL DE PROCESSOS', style: 'tableHeader' },
                { text: jsonData.total.toString(), style: 'tableData' }
              ],
              [
                { text: 'ANÁLISE DE ADMISSIBILIDADE', style: 'admissibilidadeHeader' },
                { text: jsonData.analise.toString(), style: 'tableData' }
              ],
              [
                { text: 'INADMISSÍVEIS', style: 'inadmissiveisHeader' },
                { text: jsonData.inadimissiveis.toString(), style: 'tableData' }
              ],
              [
                { text: 'ADMISSÍVEIS', style: 'admissiveisHeader' },
                { text: jsonData.admissiveis.toString(), style: 'tableData' }
              ],
            ]
          },
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto'], // Define as larguras das colunas
            body: [
              [
                { text: 'SMUL', style: 'tableHeader' },
                { text: jsonData.em_analise.smul.quantidade.toString(), style: 'tableData' }
              ],
              [
                { text: 'GRAPROEM', style: 'tableHeader' },
                { text: jsonData.em_analise.graproem.quantidade.toString(), style: 'tableData' }
              ],
              [
                { text: 'TOTAL PARCIAL', style: 'tableHeader' },
                { text: jsonData.em_analise.total_parcial.toString(), style: 'tableData' }
              ],
            ]
          },
        }
      ],
      styles: {
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

    // Gera e abre o PDF
    pdfMake.createPdf(docDefinition).getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setModalIsOpen(true); // Abre o modal ao gerar o PDF
    });
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');

  return (
    <Content
      titulo='Relatórios'
      breadcrumbs={[{
        label: 'Relatórios',
        href: ''
      }]}
    >
      {
        construcao ?
          <Box>
            <Card>
              <CardContent>
                <Typography 
                  level='h3' 
                  textAlign={'center'}
                >
                  Relatório em construção
                </Typography>
              </CardContent>
            </Card>
          </Box>
          :
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2 
            }}
          >
            <Card
              size='lg'
              variant='outlined'
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' }
              }}
            >
              <FormControl>
                <FormLabel>Tipo de Relatório</FormLabel>
                <Select
                  defaultValue={'XLSX'}
                  sx={{
                    width: '100%',
                    mb: 3,
                    alignSelf: { xs: 'center', sm: 'auto' }
                  }}
                >
                  <Option
                    onClick={() => setFileType('XLSX')}
                    value='XLSX'
                  >
                    Tipo 1
                  </Option>
                  <Option
                    onClick={() => setFileType('PDF')}
                    value='PDF'
                  >
                    Tipo 2
                  </Option>
                </Select>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      onChange={(e) => setDate(e?.toDate())}
                      views={['month', 'year']}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <FormLabel sx={{ mt: 2 }}>Extensão de Arquivo</FormLabel>
                <Select
                  defaultValue={'XLSX'}
                  sx={{
                    width: '100%',
                    mb: { xs: 3, sm: 0 },
                    alignSelf: { xs: 'center', sm: 'auto' }
                  }}
                >
                  <Option
                    onClick={() => setFileType('XLSX')}
                    value='XLSX'
                  >
                    XLSX (Excel)
                  </Option>
                  <Option
                    onClick={() => setFileType('PDF')}
                    value='PDF'
                  >
                    PDF
                  </Option>
                </Select>
              </FormControl>
              <FormControl
                sx={{
                  mx: 2,
                  alignSelf: { xs: 'start', sm: 'end' },
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <Button
                  color='primary'
                  onClick={exportFile}
                  startDecorator={
                    fileType == 'XLSX' 
                    ? <DownloadForOfflineRoundedIcon /> 
                    : <RemoveRedEyeRoundedIcon />
                  }
                  sx={{ width: 'fit-content' }}
                >
                  { fileType == 'XLSX' ? 'Download' : 'Visualizar' }
                </Button>
              </FormControl>
            </Card>
            <Card>
              <Box>
                <Typography level='h4'>
                  Visualizar Relatório
                </Typography>
              </Box>
              <Divider />
              {pdfUrl && (
                <iframe
                  src={pdfUrl}
                  title="Visualizador de PDF"
                  style={{ width: '100%', height: 1200 }}
                ></iframe>
              )}
            </Card>
          </Box>
      }
    </Content >
  );
}
