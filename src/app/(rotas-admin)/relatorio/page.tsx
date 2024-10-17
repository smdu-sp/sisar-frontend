'use client'

import Content from '@/components/Content';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { Button, Card, FormControl, FormLabel, Option, Select } from '@mui/joy';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
  const [ fileType, setFileType ] = useState<'XLSX' | 'PDF' | 'ALL'>();
  const [ date, setDate ] = useState<Date | undefined>();

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

  const exportToPdf = (): void => console.log('PDF');

  const exportFile = (): void => {
    if (date === undefined) 
      throw new Error('Erro ao baixar o arquivo, data não selecionada');
    if (fileType == 'ALL') {
      exportToXlsx();
      exportToPdf();
      return
    };
    fileType === 'PDF' ? exportToPdf() : exportToXlsx();
  }

  return (
    <Content 
      titulo='Relatórios'
      breadcrumbs={[{
        label: 'Relatórios',
        href: ''
      }]}
    >
      <Card
        size='lg'
        variant='outlined'
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row'}
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
              onClick={() => setFileType('ALL')} 
              value='Todos'
            >
              Todos 
            </Option>
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
            flexDirection : 'row'
          }}
        >
          <Button
            color='primary'
            onClick={exportFile}
            startDecorator={<DownloadForOfflineIcon />}
            sx={{ width: 'fit-content' }}
          >
            Download
          </Button>
        </FormControl>
      </Card>
    </Content>  
  );
}
