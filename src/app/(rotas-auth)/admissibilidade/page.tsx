'use client'

import Content from '@/components/Content';
import { Box, Button, Chip, ChipPropsColorOverrides, ColorPaletteProp, FormControl, FormLabel, IconButton, Input, Option, Select, Snackbar, Stack, Tab, TabList, TabPanel, Table, Tabs, Typography, tabClasses } from '@mui/joy';
import { TablePagination } from '@mui/material';
import * as inicialServices from '@/shared/services/inicial.services';
import * as admissibilidadeServices from '@/shared/services/admissibilidade.services';
import { IAdmissibilidade, IPaginadoAdmissibilidade } from '@/shared/services/admissibilidade.services';
import { IInicial, IPaginatedInicial } from '@/shared/services/inicial.services';
import { useCallback, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Add, Clear, Refresh, Search } from '@mui/icons-material';
import { OverridableStringUnion } from '@mui/types';
import { buscarAdministrativos } from '@/shared/services/usuario.services';
import { AlertsContext } from '@/providers/alertsProvider';
export default function Admissibilidade() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [admissibilidade, setAdmissibilidade] = useState<IAdmissibilidade[]>([]);
  const [pagina, setPagina] = useState(searchParams.get('pagina') ? Number(searchParams.get('pagina')) : 1);
  const [limite, setLimite] = useState(searchParams.get('limite') ? Number(searchParams.get('limite')) : 10);
  const [total, setTotal] = useState(searchParams.get('total') ? Number(searchParams.get('total')) : 1);
  const [busca, setBusca] = useState(searchParams.get('busca') || '');

  const [statusFiltro, setStatusFiltro] = useState(-1);
  const router = useRouter();
  const confirmaVazio: {
    aberto: boolean,
    confirmaOperacao: () => void,
    titulo: string,
    pergunta: string,
    color: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides>
  } = {
    aberto: false,
    confirmaOperacao: () => { },
    titulo: '',
    pergunta: '',
    color: 'primary'
  }
  const [confirma, setConfirma] = useState(confirmaVazio);
  const { setAlert } = useContext(AlertsContext);
  useEffect(() => {
    buscaAdmissibilidade();
  }, [pagina, limite, statusFiltro]);


  const buscaAdmissibilidade = () => {
    admissibilidadeServices.buscarTudo(1, 10, statusFiltro)
      .then((response: IPaginadoAdmissibilidade) => {
        setTotal(response.total);
        setPagina(response.pagina);
        setLimite(response.limite);
        setAdmissibilidade(response.data);
      });
  }
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString();
    },
    [searchParams]
  );


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
    { label: 'Adimitidos', color: 'success' },
    { label: 'Em adimissão', color: 'primary' },
    { label: 'Inadimissível', color: 'danger' },
    { label: 'Reconseideração', color: 'warning' },
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
      <Snackbar
        variant="solid"
        color={confirma.color}
        size="lg"
        invertedColors
        open={confirma.aberto}
        onClose={() => setConfirma({ ...confirma, aberto: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ maxWidth: 360 }}
      >
        <div>
          <Typography level="title-lg">{confirma.titulo}</Typography>
          <Typography sx={{ mt: 1, mb: 2 }} level="title-md">{confirma.pergunta}</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="solid" color="primary" onClick={() => confirma.confirmaOperacao()}>
              Sim
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setConfirma(confirmaVazio)}
            >
              Não
            </Button>
          </Stack>
        </div>
      </Snackbar>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
          alignItems: 'end',
        }}
      >
        <IconButton size='sm' onClick={() => {buscaAdmissibilidade();}}><Refresh /></IconButton>
        <IconButton size='sm' ><Clear /></IconButton>
        <Select
          size="sm"
          value={statusFiltro}
          onChange={(_, value) => { setStatusFiltro(value as number); }}
        >
          <Option value={-1}>Todos</Option>
          <Option value={0}>Adimitidos</Option>
          <Option value={1}>Em admissão</Option>
          <Option value={2}>Inadimissiveis</Option>
          <Option value={3}>Reconseideração</Option>
        </Select>
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Buscar: </FormLabel>
          <Input
            startDecorator={<Search fontSize='small' />}
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                router.push(pathname + '?' + createQueryString('busca', busca));
                buscarAdministrativos();
              }
            }}
          />
        </FormControl>
      </Box>
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
                color: `${statusFiltro === -1 ? 'primary' : status[statusFiltro].color}.500`,
                bgcolor: 'background.surface',
              },
              [`&.${tabClasses.focusVisible}`]: {
                outlineOffset: '-4px',
              },
            },
          }}
        >
          <Tab variant="soft" >
            {statusFiltro === -1 ? 'Geral' : status[statusFiltro].label}
          </Tab>
        </TabList>
        <TabPanel value={0}>
          <Table hoverRow sx={{ tableLayout: 'auto' }}>
            <thead>
              <tr>
                <th>Inicial ID</th>
                <th>Sei</th>
                <th>Data Envio</th>
                <th>Parecer</th>
                <th>Data Criação</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {admissibilidade && admissibilidade.length > 0 ? admissibilidade.map((admissibilidade: IAdmissibilidade) => (
                <tr onClick={() => router.push(`/inicial/detalhes/${admissibilidade.inicial_id}`)} key={admissibilidade.inicial_id} style={{ cursor: 'pointer' }}>
                  <td>{admissibilidade.inicial_id}</td>
                  <td>{admissibilidade.inicial?.sei}</td>
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
      </Tabs>

      <IconButton component='a' href='/inicial/detalhes' color='primary' variant='soft' size='lg' sx={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
      }}><Add /></IconButton>
    </Content>
  );
}
