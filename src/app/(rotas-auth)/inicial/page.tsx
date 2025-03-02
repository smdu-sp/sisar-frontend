'use client'

import Content from '@/components/Content';
import { FormLabel, Input, Modal, Button, Chip, ChipPropsColorOverrides, ColorPaletteProp, DialogContent, DialogTitle, FormControl, IconButton, ModalDialog, Stack, Tab, TabList, TabPanel, Table, Tabs, tabClasses, FormHelperText, Select, Option, Box } from '@mui/joy';
import { TablePagination } from '@mui/material';
import * as inicialServices from '@/shared/services/inicial/inicial.services';
import { IInicial, IPaginatedInicial } from '@/shared/services/inicial/inicial.services';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Add, Clear, Refresh, Search } from '@mui/icons-material';
import { OverridableStringUnion } from '@mui/types';
import * as comum from "@/shared/services/common/comum.services";

export default function Inicial() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [iniciais, setIniciais] = useState<IInicial[]>([]);
  const [pagina, setPagina] = useState(searchParams.get('pagina') ? Number(searchParams.get('pagina')) : 1);
  const [limite, setLimite] = useState(searchParams.get('limite') ? Number(searchParams.get('limite')) : 10);
  const [total, setTotal] = useState(searchParams.get('total') ? Number(searchParams.get('total')) : 1);
  const [statusBusca, setStatusBusca] = useState(searchParams.get('status') ? Number(searchParams.get('status')) : -1);
  const [modalProcessoNovo, setModalProcessoNovo] = useState(false);
  const [seiNovo, setSeiNovo] = useState('');
  const [processoExistente, setProcessoExistente] = useState<IInicial>();
  const router = useRouter();
  const [busca, setBusca] = useState(searchParams.get('busca') || '');

  useEffect(() => {
    buscaIniciais();
  }, [pagina, limite, statusBusca]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString();
    },
    [searchParams]
  );

  const buscaIniciais = async () => {
    const buscaLimpa = busca.replace(/[-./]/g, '');
    inicialServices.buscarTudo(pagina, limite, buscaLimpa, statusBusca.toString())
      .then((response: IPaginatedInicial) => {
        setTotal(response.total);
        setPagina(response.pagina);
        setLimite(response.limite);
        setIniciais(response.data);
      });
  }

  const checaSei = async (sei: string) => {
    inicialServices.verificaSei(sei).then((response: IInicial | null) => {
      if (response) {
        setProcessoExistente(response);
      }
    })
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
    { label: 'Admissibilidade', color: 'neutral' },
    { label: 'Via Ordinaria', color: 'warning' },
    { label: 'Em Análise', color: 'primary' },
    { label: 'Deferido', color: 'success' },
    { label: 'Indeferido', color: 'danger' },
  ]

  const processo: { label: string, color: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides> | undefined }[] = [
    { label: '-', color: 'primary' },
    { label: 'Próprio SMUL', color: 'neutral' },
    { label: 'Múltiplas Interfaces', color: 'primary' },
  ]

  return (
    <Content
      titulo='Processos'
      breadcrumbs={[{
        label: 'Processos',
        href: ''
      }]}
    >
      <Modal open={modalProcessoNovo} onClose={() => setModalProcessoNovo(false)}>
        <ModalDialog>
          <DialogTitle>Novo Processo</DialogTitle>
          <DialogContent>Buscar SEI do processo</DialogContent>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>SEI</FormLabel>
              <Input
                value={seiNovo}
                onChange={(e) => {
                  var numSei = e.target.value;
                  if (numSei.length >= 0) setSeiNovo(comum.formatarSei(e.target.value));
                  if (numSei.replaceAll(/\D/g, '').length < 16) setProcessoExistente(undefined);
                  if (numSei.replaceAll(/\D/g, '').length === 16) checaSei(numSei);
                }}
              />
            </FormControl>
            {!comum.validaDigitoSei(seiNovo) && <FormHelperText>
              SEI Inválido
            </FormHelperText>}
            {processoExistente && processoExistente.id && <FormHelperText component={'a'} href={`/inicial/detalhes/${processoExistente.id}`}>
              Processo já cadastrado: #{processoExistente.id}
            </FormHelperText>}
          </Stack>
          {(seiNovo.length > 18 && comum.validaDigitoSei(seiNovo)) && !(processoExistente && processoExistente.id) && <Stack sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', gap: 1 }}>
            <Button component='a' href={`/inicial/detalhes?novo-processo=${seiNovo.replaceAll(/\D/g, '')}`} sx={{ flexGrow: 1 }} color="success">Novo processo</Button>
          </Stack>}
        </ModalDialog>
      </Modal>
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
        <IconButton size='sm' onClick={() => { buscaIniciais() }}><Refresh /></IconButton>
        <IconButton size='sm' ><Clear /></IconButton>
        <Select
          size="sm"
          value={statusBusca}
          onChange={(_, value) => { setStatusBusca(value as number); }}
        >
          <Option value={-1}>Todos</Option>
          <Option value={0}>Admissibilidade</Option>
          <Option value={1}>Via Ordinaria</Option>
          <Option value={2}>Em Análise</Option>
          <Option value={3}>Deferido</Option>
          <Option value={4}>Indeferido</Option>
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
                buscaIniciais();
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
                <th>Última alteração</th>
                <th>Tipo de Processo</th>
                <th style={{ textAlign: 'right' }}></th>
              </tr>
            </thead>
            <tbody>
              {iniciais && iniciais.length > 0 ? iniciais.map((inicial: IInicial) => (
                <tr onClick={() => router.push(`/inicial/detalhes/${inicial.id}?tab=0`)} key={inicial.id} style={{ cursor: 'pointer' }}>
                  <td>{inicial.id}</td>
                  <td>
                    <Chip color={inicial.status > 1 ? status[inicial.status].color : status[inicial.status].color}>
                      {inicial.status > 2 ? status[inicial.status].label : status[inicial.status].label}
                    </Chip>
                  </td>
                  <td>{comum.formatarSei(inicial.sei)}</td>
                  <td>{inicial.tipo_requerimento}</td>
                  <td>{inicial.requerimento}</td>
                  <td>{new Date(inicial.data_protocolo).toLocaleDateString('pt-BR')}</td>
                  <td>{inicial.alvara_tipo.nome}</td>
                  <td>{new Date(inicial.alterado_em).toLocaleString('pt-BR')}</td>
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
      <IconButton /*component='a' href='/inicial/detalhes'*/ onClick={() => setModalProcessoNovo(true)} color='primary' variant='soft' size='lg' sx={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
      }}><Add /></IconButton>
    </Content>
  );
}
