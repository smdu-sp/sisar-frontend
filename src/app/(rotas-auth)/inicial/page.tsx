'use client'

import Content from '@/components/Content';
import { Button, Chip, ChipPropsColorOverrides, ColorPaletteProp, IconButton, Tab, TabList, TabPanel, Table, Tabs, tabClasses } from '@mui/joy';
import { TablePagination } from '@mui/material';
import * as inicialServices from '@/shared/services/inicial.services';
import { IInicial, IPaginatedInicial } from '@/shared/services/inicial.services';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Add } from '@mui/icons-material';
import { OverridableStringUnion } from '@mui/types';

export default function Inicial() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [iniciais, setIniciais] = useState<IInicial[]>([]);
  const [pagina, setPagina] = useState(searchParams.get('pagina') ? Number(searchParams.get('pagina')) : 1);
  const [limite, setLimite] = useState(searchParams.get('limite') ? Number(searchParams.get('limite')) : 10);
  const [total, setTotal] = useState(searchParams.get('total') ? Number(searchParams.get('total')) : 1);
  const router = useRouter();

  useEffect(() => {
    buscaIniciais();
  }, [ pagina, limite ]);

  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString();
    },
    [searchParams]
  );

  const buscaIniciais = async () => {
    inicialServices.buscarTudo(1, 10)
      .then((response: IPaginatedInicial) => {
        setTotal(response.total);
        setPagina(response.pagina);
        setLimite(response.limite);
        setIniciais(response.data);
      });
  }

  const mudaPagina = (
    _: React.MouseEvent<HTMLButtonElement> | null, novaPagina: number,
  ) => {
    router.push(pathname + '?' + createQueryString('pagina', String(novaPagina + 1)));
    setPagina(novaPagina + 1);
  };

  const mudaLimite = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    router.push(pathname + '?' + createQueryString('limite', String(event.target.value)));
    setLimite(parseInt(event.target.value, 10));
    setPagina(1);
  };

  const status: { label: string, color: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides> | undefined }[] = [
    { label: '-', color: 'primary' },
    { label: 'Inicial', color: 'neutral' },
    { label: 'Admissibilidade', color: 'primary' },
  ]

  const processo: { label: string, color: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides> | undefined }[] = [
    { label: '-', color: 'primary' },
    { label: 'Próprio SMUL', color: 'neutral' },
    { label: 'Múltiplas Interfaces', color: 'primary' },
  ]

  return (
    <Content 
      titulo='Processos'
      pagina='inicial'
      breadcrumbs={[{
        label: 'Processos',
        href: ''
      }]}
    >
      <Tabs
        variant="outlined"
        defaultValue={0}
        sx={{
          borderRadius: 'lg',
          boxShadow: 'sm',
          overflow: 'auto',
        }}
      >
        <TabList
          disableUnderline
          tabFlex={1}
          sx={{
            [`& .${tabClasses.root}`]: {
              fontSize: 'sm',
              fontWeight: 'lg',
              [`&[aria-selected="true"]`]: {
                color: 'primary.500',
                bgcolor: 'background.surface',
              },
              [`&.${tabClasses.focusVisible}`]: {
                outlineOffset: '-4px',
              },
            },
          }}
        >
          <Tab variant="soft" >
            Dados iniciais
          </Tab>
        </TabList>
        <TabPanel value={0}>
            <Table hoverRow sx={{ tableLayout: 'auto' }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Status</th>
                  <th>SEI</th>
                  <th title='Tipo de Requerimento'>Tipo Req.</th>
                  <th>Requerimento</th>
                  <th>Protocolo</th>
                  <th>Tipo de Alvará</th>
                  <th>Tipo de Processo</th>
                  <th style={{ textAlign: 'right' }}></th>
                </tr>
              </thead>
              <tbody>
                {iniciais && iniciais.length > 0 ? iniciais.map((inicial: IInicial) => (
                  <tr onClick={() => router.push(`/inicial/detalhes/${inicial.id}`)} key={inicial.id} style={{ cursor: 'pointer' }}>
                    <td>{inicial.id}</td>
                    <td>
                      <Chip color={inicial.status > 1 ? status[0].color : status[inicial.status].color}>
                        {inicial.status > 2 ? status[0].label : status[inicial.status].label}
                      </Chip>
                    </td>
                    <td>{inicial.sei}</td>
                    <td>{inicial.tipo_requerimento}</td>
                    <td>{inicial.requerimento}</td>
                    <td>{new Date(inicial.data_protocolo).toLocaleDateString('pt-BR')}</td>
                    <td>{inicial.alvara_tipo.nome}</td>
                    <td>
                      <Chip color={processo[inicial.tipo_processo].color}>
                        {processo[inicial.tipo_processo].label}
                      </Chip>
                    </td>
                    <td style={{ textAlign: 'right' }}></td>
                  </tr>
                )) : <tr><td colSpan={9}>Nenhum cadastro inicial encontrado</td></tr>}
              </tbody>
            </Table>
            {(total && total > 0) ? <TablePagination
              component="div"
              count={total}
              page={(pagina - 1)}
              onPageChange={mudaPagina}
              rowsPerPage={limite}
              onRowsPerPageChange={mudaLimite}
              rowsPerPageOptions={[10, 25, 50, 100]}
              labelRowsPerPage="Registros por página"
              labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
            /> : null}
        </TabPanel>
      </Tabs>
      <IconButton component='a' href='/inicial/detalhes' color='primary' variant='soft' size='lg' sx={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
      }}><Add /></IconButton>
    </Content>
  );
}
