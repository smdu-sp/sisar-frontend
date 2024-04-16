'use client'

import Content from '@/components/Content';
import { Button, Tab, TabList, TabPanel, Table, Tabs, tabClasses } from '@mui/joy';
import { TablePagination } from '@mui/material';
import * as inicialServices from '@/shared/services/inicial.services';
import { IInicial, IPaginatedInicial } from '@/shared/services/inicial.services';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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

  return (
    <Content 
      titulo='Inicial'
      pagina='inicial'
      breadcrumbs={[{
        label: 'Inicial',
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
          <Tab variant="soft">
            Distribuição
          </Tab>
          <Tab variant="soft">
            Admissibilidade
          </Tab>
          <Tab variant="soft">
            Coord. SMUL
          </Tab>
          <Tab variant="soft">
            Secretarias
          </Tab>
          <Tab variant="soft" >
            Conclusão
          </Tab>
        </TabList>
        <TabPanel value={0}>
            <Table hoverRow sx={{ tableLayout: 'auto' }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>SEI</th>
                  <th>Tipo Requerimento</th>
                  <th>Requerimento</th>
                  <th>Data protocolo</th>
                  <th>Tipo de Alvará</th>
                  <th>Tipo de Processo</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}></th>
                </tr>
              </thead>
              <tbody>
                {iniciais && iniciais.length > 0 ? iniciais.map((inicial: IInicial) => (
                  <tr key={inicial.id} style={{ cursor: 'pointer' }}>
                    <td>{inicial.id}</td>
                    <td>{inicial.sei}</td>
                    <td>{inicial.tipo_requerimento}</td>
                    <td>{inicial.requerimento}</td>
                    <td>{new Date(inicial.data_protocolo).toLocaleDateString('pt-BR')}</td>
                    <td>{inicial.alvara_tipo.nome}</td>
                    <td>{inicial.tipo_processo}</td>
                    <td>{inicial.status}</td>
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
        <TabPanel value={1}>
          Distribuição
        </TabPanel>
        <TabPanel value={2}>
          Admissibilidade
        </TabPanel>
        <TabPanel value={3}>
          Coord. SMUL
        </TabPanel>
        <TabPanel value={4}>
          Secretarias
        </TabPanel>
        <TabPanel value={5}>
          Conclusão
        </TabPanel>
      </Tabs>
      <Button
        component="a"
        href="inicial/detalhes"
        variant="solid"
        size='lg'
        sx={{
          position: 'absolute',
          bottom: 50,
          right: 50,
        }}
      >
        Novo
      </Button>
    </Content>
  );
}
