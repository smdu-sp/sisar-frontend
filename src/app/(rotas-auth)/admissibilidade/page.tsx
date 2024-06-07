'use client'

import Content from '@/components/Content';
import { Button, Chip, ChipPropsColorOverrides, ColorPaletteProp, IconButton, Tab, TabList, TabPanel, Table, Tabs, tabClasses } from '@mui/joy';
import { TablePagination } from '@mui/material';
import * as inicialServices from '@/shared/services/inicial.services';
import * as admissibilidadeServices from '@/shared/services/admissibilidade.services';
import { IAdmissibilidade, IPaginadoAdmissibilidade } from '@/shared/services/admissibilidade.services';
import { IInicial, IPaginatedInicial } from '@/shared/services/inicial.services';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Add } from '@mui/icons-material';
import { OverridableStringUnion } from '@mui/types';
export default function Admissibilidade() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [admissibilidade, setAdmissibilidade] = useState<IAdmissibilidade[]>([]);
  const [pagina, setPagina] = useState(searchParams.get('pagina') ? Number(searchParams.get('pagina')) : 1);
  const [limite, setLimite] = useState(searchParams.get('limite') ? Number(searchParams.get('limite')) : 10);
  const [total, setTotal] = useState(searchParams.get('total') ? Number(searchParams.get('total')) : 1);
  const router = useRouter();

  useEffect(() => {
    buscaAdimissibilidade();
  }, [pagina, limite]);


  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString();
    },
    [searchParams]
  );

  const buscaAdimissibilidade = async () => {
    admissibilidadeServices.buscarTudo(1, 10)
      .then((response: IPaginadoAdmissibilidade) => {
        setTotal(response.total);
        setPagina(response.pagina);
        setLimite(response.limite);
        setAdmissibilidade(response.data);
        
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
    { label: 'Adimitido', color: 'success' },
    { label: 'Aguardando', color: 'warning' },
    { label: 'Inadimissível', color: 'danger' },
  ]

  const processo: { label: string, color: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides> | undefined }[] = [
    { label: '-', color: 'primary' },
    { label: 'Próprio SMUL', color: 'neutral' },
    { label: 'Múltiplas Interfaces', color: 'primary' },
  ]
  return (
    <Content
      titulo='Admissibilidade'
      pagina='admissibilidade'
      breadcrumbs={[{
        label: 'Admissibilidade',
        href: 'admissibilidade'
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
            Em admissâo
          </Tab>
          <Tab variant="soft" >
            Admitidos
          </Tab>
        </TabList>
        <TabPanel value={0}>
          <Table hoverRow sx={{ tableLayout: 'auto' }}>
            <thead>
              <tr>
                <th>Inicial ID</th>
                <th>Data Envio</th>
                <th>parecer</th>
                <th>data criação</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {admissibilidade && admissibilidade.length > 0 ? admissibilidade.map((admissibilidade: IAdmissibilidade) => (
                <tr onClick={() => router.push(`/inicial/detalhes/${admissibilidade.inicial_id}`)} key={admissibilidade.inicial_id} style={{ cursor: 'pointer' }}>
                  <td>{admissibilidade.inicial_id}</td>
                  <td>{admissibilidade.data_envio ? new Date(admissibilidade.data_envio).toLocaleDateString('pt-BR') : ''}</td>
                  <td>{admissibilidade.parecer === true ? 'true' : 'false'}</td>
                  <td>{admissibilidade.data_envio ? new Date(admissibilidade.data_envio).toLocaleDateString('pt-BR') : ''}</td>
                  <td>
                    {admissibilidade.status !== undefined && status[admissibilidade.status] && (
                      <Chip color={status[admissibilidade.status].color}>
                        {status[admissibilidade.status].label}
                      </Chip>
                    )}
                  </td>

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
        <TabPanel value={1}>
          <Table hoverRow sx={{ tableLayout: 'auto' }}>
            <thead>
              <tr>
                <th>Inicial ID</th>
                <th>Data Envio</th>
                <th>parecer</th>
                <th>data criação</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {admissibilidade && admissibilidade.length > 0 ? admissibilidade.map((admissibilidade: IAdmissibilidade) => (
                <tr onClick={() => router.push(`/inicial/detalhes/${admissibilidade.inicial_id}`)} key={admissibilidade.inicial_id} style={{ cursor: 'pointer' }}>
                  <td>{admissibilidade.inicial_id}</td>
                  <td>{admissibilidade.data_envio ? new Date(admissibilidade.data_envio).toLocaleDateString('pt-BR') : ''}</td>
                  <td>{admissibilidade.parecer === true ? 'Admitido' : 'Rejeitado'}</td>
                  <td>{admissibilidade.data_envio ? new Date(admissibilidade.data_envio).toLocaleDateString('pt-BR') : ''}</td>
                  <td>
                    {admissibilidade.status !== undefined && status[admissibilidade.status] && (
                      <Chip color={status[admissibilidade.status].color}>
                        {status[admissibilidade.status].label}
                      </Chip>
                    )}
                  </td>

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
