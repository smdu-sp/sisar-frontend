'use client'

import Content from '@/components/Content';
// @ts-ignore
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
// @ts-ignore
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
// @ts-ignore
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
import * as relatorioService from '@/shared/services/relatorios/quantitativo.service';
import { IQuantitativoResponse } from '@/shared/services/relatorios/quantitativo.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function ExportXlsx() {
  const [ relatorioType, setRelatorioType ] = useState<string>('');
  const [fileType, setFileType] = useState<'XLSX' | 'PDF'>('XLSX');
  const [date, setDate] = useState<Date | undefined>();
  const [construcao, setConstrucao] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const { setAlert } = React.useContext(AlertsContext);
  const [quantitativo, setQuantitativo] = useState<IQuantitativoResponse>();

  const getRelatorio = async (month: string, year: string) => {
    try {
      const relatorio = await relatorioService.relatorioQuantitativo(month, year);
      console.log(relatorio);
      if (relatorio) setQuantitativo(relatorio);
    } catch (error) {
      throw error; 
    }
  };

  const smulData = async (): Promise<{ Key: string, Value: number }[]> => {
    if (quantitativo == null || quantitativo == undefined) throw new Error('Não foi possível buscar o relatório')
    return quantitativo.em_analise.smul.data.map((item: { nome: string, count: number }) => ({
      Key: item.nome,
      Value: item.count
    }));
  }

  const graproemData = async (): Promise<{ Key: string, Value: number }[]> => {
    if (quantitativo == null || quantitativo == undefined) throw new Error('Não foi possível buscar o relatório')
    return quantitativo.em_analise.graproem.data.map((item: { nome: string, count: number }) => ({
      Key: item.nome,
      Value: item.count
    }));
  }

  const mainData = async (): Promise<{ Key: string, Value: any }[]> => [
    { Key: '', Value: '' },
    { Key: 'Dados totais', Value: '' },
    { Key: 'Total', Value: quantitativo?.total },
    { Key: 'Análise', Value: quantitativo?.analise },
    { Key: 'Inadimissíveis', Value: quantitativo?.inadmissiveis },
    { Key: 'Admissíveis', Value: quantitativo?.admissiveis },
    { Key: 'Data Gerado', Value: quantitativo?.data_gerado },
    { Key: '', Value: '' },
    { Key: 'Em Analise', Value: '' },
    { Key: 'SMUL', Value: quantitativo?.em_analise.smul.quantidade },
    { Key: 'GRAPROEM', Value: quantitativo?.em_analise.graproem.quantidade },
    { Key: 'Total Parcial', Value: quantitativo?.em_analise.total_parcial },
    { Key: '', Value: '' },
    { Key: 'SMUL', Value: '' },
    ...(await smulData()),
    { Key: '', Value: '' },
    { Key: 'Graproem', Value: '' },
    ...(await graproemData())
  ];

  const getRelatorioDate = (): string => `${date?.toString().split(' ')[1]}-${date?.toString().split(' ')[3]}`;

  const exportToXlsx = async (): Promise<void> => {
    const worksheetMain: XLSX.WorkSheet = XLSX.utils.json_to_sheet(await mainData());
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheetMain, 'Dados');
    XLSX.writeFile(workbook, `Relatorio-${getRelatorioDate()}.xlsx`);
  };

  const exportFile = async (): Promise<void> => {
    try {
      if (!date) throw new Error(' Data não selecionada');
      await getRelatorio(date.getMonth().toString(), date.getFullYear().toString());
      // if (!quantitativo) throw new Error('Não foi possível buscar o relatório')
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
                { text: quantitativo?.total.toString(), style: 'tableData' }
              ],
              [
                { text: 'ANÁLISE DE ADMISSIBILIDADE', style: 'admissibilidadeHeader' },
                { text: quantitativo?.analise.toString(), style: 'tableData' }
              ],
              [
                { text: 'INADMISSÍVEIS', style: 'inadmissiveisHeader' },
                { text: quantitativo?.inadmissiveis.toString(), style: 'tableData' }
              ],
              [
                { text: 'ADMISSÍVEIS', style: 'admissiveisHeader' },
                { text: quantitativo?.admissiveis.toString(), style: 'tableData' }
              ],
            ]
          } // Adiciona margem inferior para espaço entre tabelas
        },

        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto'], // Define as larguras das colunas
            body: [
              [
                { text: 'SMUL', style: 'tableHeader' },
                { text: quantitativo?.em_analise.smul.quantidade.toString(), style: 'tableData' }
              ],
              [
                { text: 'GRAPROEM', style: 'tableHeader' },
                { text: quantitativo?.em_analise.graproem.quantidade.toString(), style: 'tableData' }
              ],
              [
                { text: 'TOTAL PARCIAL', style: 'tableHeader' },
                { text: quantitativo?.em_analise.total_parcial.toString(), style: 'tableData' }
              ],
            ]
          } // Adiciona margem superior para espaço entre tabelas
        }
      ],
      styles: {
        table: {
          marginBottom: 10,
        },
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

  return (
    <Content
      titulo='Relatórios'
      breadcrumbs={[{
        label: 'Relatórios',
        href: ''
      }]}
    >
      {
        construcao 
        &&
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
        ||
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
                defaultValue={'Tipo 1'}
                sx={{
                  width: '100%',
                  mb: 3,
                  alignSelf: { xs: 'center', sm: 'auto' }
                }}
              >
                <Option
                  onClick={() => setRelatorioType('Tipo 1')}
                  value='Tipo 1'
                >
                  Tipo 1
                </Option>
                <Option
                  onClick={() => setRelatorioType('Tipo 2')}
                  value='Tipo 2'
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
                { fileType == 'XLSX' ? 'Download' : 'Pré-visualizar' }
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
