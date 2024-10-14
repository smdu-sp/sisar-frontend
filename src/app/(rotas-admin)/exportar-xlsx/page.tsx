'use client'

import { Box, Button } from '@mui/joy';
import React from 'react';
import * as XLSX from 'xlsx';

export default function ExportXlsx() {
  
  const data = [
    { nome: 'Gustavo', profissao: 'dev' },
    { nome: 'Victor', profissao: 'dev' },
    { nome: 'Marcus', profissao: 'dev' }
    // {
    //   "total": 12,
    //   "analise": 0,
    //   "inadimissiveis": 1,
    //   "admissiveis": 11,
    //   "data_gerado": "14/10/2024"
    // }
  ];

  const exportToExcel = (): void => {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Desenvolvedores');
    XLSX.writeFile(workbook, 'devs_secretaria.xlsx');
    return
  }

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Button onClick={exportToExcel}>
          Exportar
        </Button>
      </Box>
    </>
  );
}
