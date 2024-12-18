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
import { getArQunatitativoXlsx, getArStatusResumoQuantitativoPdf, getRelatorioArQuantitativo } from '@/components/relatorios/ar-status-resumo-quantitativo';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function ExportXlsx() {
  const [ relatorioType, setRelatorioType ] = useState<'ARSRQ' | 'RRSRQ'>();
  const [fileType, setFileType] = useState<'XLSX' | 'PDF'>('XLSX');
  const [date, setDate] = useState<Date | undefined>();
  const [construcao, setConstrucao] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const { setAlert } = React.useContext(AlertsContext);

  const getRelatorioDate = (): string => `${date?.toString().split(' ')[1]}-${date?.toString().split(' ')[3]}`;

  const exportToXlsx = async (): Promise<void> => {
    try {
      if (!date) throw new Error('Selecione uma data!');
      let worksheetMain: XLSX.WorkSheet | null = null;
      if (!relatorioType) throw new Error('Selecione o tipo de relatório!');
  
      switch (relatorioType) {
        case 'ARSRQ':
          worksheetMain = XLSX.utils.json_to_sheet(await getArQunatitativoXlsx((date.getMonth() + 1).toString(), date.getFullYear().toString()));
          break;
        case 'RRSRQ':
          worksheetMain = XLSX.utils.json_to_sheet(await getArQunatitativoXlsx((date.getMonth() + 1).toString(), date.getFullYear().toString()));
      }

      // if (relatorioType == 'ARSRQ') {
      //   worksheetMain = XLSX.utils.json_to_sheet(await getArQunatitativoXlsx((date.getMonth() + 1).toString(), date.getFullYear().toString()));
      // }
  
      // if (relatorioType == 'RRSRQ') {
      //   throw new Error('Ainda indisponível');
      // }
  
      if (worksheetMain == null) {
        return
      }
  
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheetMain, 'Dados');
      XLSX.writeFile(workbook, `Relatorio-${getRelatorioDate()}.xlsx`); 
    } catch (error: any) {
      throw setAlert(error.message, "Indisponível", 'warning', 3000, WarningAmberRoundedIcon); 
    }
  };

  const gerarPDF = async () => {
    try {
      if (!date) throw new Error("Não existe relatório na variável quantitativo");
      if (!relatorioType) throw new Error("Tipo do reltório não selecionado");
      let docDefinition;
  
      if (relatorioType == 'ARSRQ') {
        docDefinition = await getArStatusResumoQuantitativoPdf((date.getMonth() + 1).toString(), date.getFullYear().toString());
      } 
  
      if (relatorioType == 'RRSRQ') {
        throw new Error('Relatório ainda indisponível');
      }
  
      if (!docDefinition) return
  
      pdfMake.createPdf(docDefinition).getBlob((blob) => {
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        setModalIsOpen(true);
      }); 
    } catch (error: any) {
      throw setAlert(error.message, "Indisponível", 'warning', 3000, WarningAmberRoundedIcon); 
    }
  };

  const exportFile = async (): Promise<void> => {
    try {
      if (!fileType) throw new Error();
      if (fileType == 'PDF') {
        gerarPDF();
        return
      }
      if (fileType == 'XLSX') {
        exportToXlsx();
        return
      } 
    } catch (error: any) {
      throw setAlert(error.message, "Indisponível", 'warning', 3000, WarningAmberRoundedIcon); 
    }
  }

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
                  onClick={() => setRelatorioType('ARSRQ')}
                  value='ARSRQ'
                >
                  Aprova Rápido - Status e Resumo Quantitativo
                </Option>
                <Option
                  onClick={() => setRelatorioType('RRSRQ')}
                  value='RRSRQ'
                >
                  Requalifica Rápido - Status e Resumo Quantitativo
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
