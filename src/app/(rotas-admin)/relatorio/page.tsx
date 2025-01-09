'use client'

import Content from '@/components/Content';
// @ts-ignore
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
// @ts-ignore
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
// @ts-ignore
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { Box, Button, Card, Divider, FormControl, FormLabel, Option, Select, Typography } from '@mui/joy';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { AlertsContext } from '@/providers/alertsProvider';
import { getArQunatitativoXlsx, getArStatusResumoQuantitativoPdf } from '@/components/relatorios/ar-status-resumo-quantitativo';
import { getRrQunatitativoXlsx, getRrStatusResumoQuantitativoPdf } from '@/components/relatorios/rr-status-resumo-quantitativo';
import { getArGraficoProgressaoMensal } from '@/components/relatorios/ar-grafico-progressao-mensal';
import { getArControleGabinetePrefeito } from '@/components/relatorios/ar-controle-gabinete-prefeito';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function ExportRelatorios() {
  const [ relatorioType, setRelatorioType ] = useState<
    'ar-status-resumo-quantitativo' | 
    'rr-status-resumo-quantitativo' |
    'ar-grafico-progressao-mensal' |
    'ar-controle-gabinete-prefeito'
  >();
  const [ fileType, setFileType ] = useState<'XLSX' | 'PDF'>('XLSX');
  const [ date, setDate ] = useState<Date | undefined>();
  const [ pdfUrl, setPdfUrl ] = useState<string>('');
  const { setAlert } = React.useContext(AlertsContext);

  // Função auxiliar para pegar a data selecionada pelo usuário
  const getRelatorioDate = (): string => `${date?.toString().split(' ')[1]}-${date?.toString().split(' ')[3]}`;

  // Função que lida com a exportação do relatório em XLSX
  const exportXlsx = async (): Promise<void> => {
    try {
      if (!relatorioType) throw new Error('Selecione o tipo de relatório!');
      if (!date) throw new Error('Selecione uma data!');
      let worksheetMain: XLSX.WorkSheet | null = null;
      switch (relatorioType) {
        case 'ar-status-resumo-quantitativo':
          worksheetMain = XLSX.utils.json_to_sheet(await getArQunatitativoXlsx((date.getMonth() + 1).toString(), date.getFullYear().toString()));
          break;
        case 'rr-status-resumo-quantitativo':
          worksheetMain = XLSX.utils.json_to_sheet(await getRrQunatitativoXlsx((date.getMonth() + 1).toString(), date.getFullYear().toString()));
          break;
      }
      if (worksheetMain == null) throw new Error('Relatório indisponível.');
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheetMain, 'Dados');
      XLSX.writeFile(workbook, `RELATORIO-${relatorioType.toUpperCase()}-${getRelatorioDate().toUpperCase()}.xlsx`); 
    } catch (error: any) {
      throw setAlert(error.message, "Indisponível", 'warning', 3000, WarningAmberRoundedIcon); 
    }
  };

  // Função que lida com a exportação do relatório em PDF
  const exportPDF = async (): Promise<void> => {
    try {
      if (!relatorioType) throw new Error("Tipo do reltório não selecionado");
      if (!date) throw new Error('Selecione uma data!');
      let docDefinition;
      switch (relatorioType) {
        case 'ar-status-resumo-quantitativo':
          docDefinition = await getArStatusResumoQuantitativoPdf((date.getMonth() + 1).toString(), date.getFullYear().toString());
          break;
        case 'rr-status-resumo-quantitativo':
          docDefinition = await getRrStatusResumoQuantitativoPdf((date.getMonth() + 1).toString(), date.getFullYear().toString());
          break;
        case 'ar-grafico-progressao-mensal':
          docDefinition = await getArGraficoProgressaoMensal((date.getMonth() + 1).toString(), date.getFullYear().toString());
          break;
        case 'ar-controle-gabinete-prefeito':
          docDefinition = await getArControleGabinetePrefeito((date.getMonth() + 1).toString(), date.getFullYear().toString());
          break;
      }
      if (!docDefinition) throw new Error('Relatório indisponível.');
      // @ts-ignore
      pdfMake.createPdf(docDefinition).getBlob(blob => setPdfUrl(URL.createObjectURL(blob))); 
    } catch (error: any) {
      throw setAlert(error.message, "Indisponível", 'warning', 3000, WarningAmberRoundedIcon); 
    }
  };

  // Função que define qual tipo de relatório gerar
  const exportFile = async (): Promise<void> => {
    try {
      if (!fileType) throw new Error('Defina o tipo de arquivo.');
      if (fileType == 'PDF') exportPDF();
      if (fileType == 'XLSX') exportXlsx();
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
                onClick={() => setRelatorioType('ar-status-resumo-quantitativo')}
                value='aprova-rapido'
              >
                Aprova Rápido - Status e Resumo Quantitativo
              </Option>
              <Option
                onClick={() => setRelatorioType('ar-grafico-progressao-mensal')}
                value='ar-grafico-progressao-mensal'
              >
                Aprova Rápido - Gráfico de Progressão Mensal
              </Option>
              <Option
                onClick={() => setRelatorioType('ar-controle-gabinete-prefeito')}
                value='ar-controle-gabinete-prefeito'
              >
                Aprova Rápido - Controle Gabinete Prefeito
              </Option>
              <Option
                onClick={() => setRelatorioType('rr-status-resumo-quantitativo')}
                value='requalifica-rapido'
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
    </Content>
  );
}
