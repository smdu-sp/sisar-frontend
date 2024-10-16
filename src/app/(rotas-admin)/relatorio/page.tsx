'use client'

import Content from '@/components/Content';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { Button, Card, FormControl, FormLabel, Option, Select } from '@mui/joy';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

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
  const [ fileType, setFileType ] = useState<'XLSX' | 'PDF'>();

  const mainData = [
    { Key: 'Total', Value: jsonData.total },
    { Key: 'Análise', Value: jsonData.analise },
    { Key: 'Inadimissíveis', Value: jsonData.inadimissiveis },
    { Key: 'Admissíveis', Value: jsonData.admissiveis },
    { Key: 'Data Gerado', Value: jsonData.data_gerado }
  ];

  const smulData = jsonData.em_analise.smul.data.map(item => ({
    Nome: item.nome,
    Quantidade: item.count
  }));

  const graproemData = jsonData.em_analise.graproem.data.map(item => ({
    Nome: item.nome,
    Quantidade: item.count
  }));

  const emAnaliseData = [
    { Key: 'SMUL', Value: jsonData.em_analise.smul.quantidade },
    { Key: 'GRAPROEM', Value: jsonData.em_analise.graproem.quantidade },
    { Key: 'Total Parcial', Value: jsonData.em_analise.total_parcial }
  ];

  const exportToXlsx = () => {
    const worksheetMain: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mainData);
    const worksheetSmul: XLSX.WorkSheet = XLSX.utils.json_to_sheet(smulData);
    const worksheetGraproem: XLSX.WorkSheet = XLSX.utils.json_to_sheet(graproemData);
    const worksheetEmAnalise: XLSX.WorkSheet = XLSX.utils.json_to_sheet(emAnaliseData);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheetMain, 'Dados Gerais');
    XLSX.utils.book_append_sheet(workbook, worksheetSmul, 'SMUL');
    XLSX.utils.book_append_sheet(workbook, worksheetGraproem, 'GRAPROEM');
    XLSX.utils.book_append_sheet(workbook, worksheetEmAnalise, 'Em Análise');
    XLSX.writeFile(workbook, 'relatorio.xlsx');
  };

  const exportToPdf = () => {
    console.log('PDF');
  };

  const exportFile = (): void => {
    if (fileType == 'PDF') {
      exportToPdf();
      return
    }
    exportToXlsx();
    return
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
              width: { xs: '100%', sm: '150px'}, 
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
          <FormLabel>Extensão de Arquivo</FormLabel>
          <Select 
            defaultValue={'XLSX'} 
            sx={{ 
              width: { xs: '100%', sm: '150px'},
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
            alignSelf: { xs: 'start', sm: 'end' }
          }}
        >
          <Button 
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
