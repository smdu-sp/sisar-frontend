'use client'

import Content from '@/components/Content';
import { Suspense, useCallback, useContext, useEffect, useState } from 'react';
import * as subprefeituraServices from '@/shared/services/subprefeitura.services';
import { Box, Button, ChipPropsColorOverrides, ColorPaletteProp, FormControl, FormLabel, IconButton, Input, Option, Select, Snackbar, Stack, Table, Tooltip, Typography, useTheme } from '@mui/joy';
import { Add, Cancel, Check, Clear, Edit, Refresh, Search, Warning } from '@mui/icons-material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AlertsContext } from '@/providers/alertsProvider';
import { TablePagination } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { IPaginadoSubprefeitura, ISubprefeitura } from '@/shared/services/subprefeitura.services';
import subprefeituraDetalhes from './detalhes/[id]/page';


export default function Unidades() {
  return (
    <Suspense>
      <SearchUnidades />
    </Suspense>
  )
}

function SearchUnidades() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [subprefeitura, setSubprefeitura] = useState<ISubprefeitura[]>([]);
  const [pagina, setPagina] = useState(searchParams.get('pagina') ? Number(searchParams.get('pagina')) : 1);
  const [limite, setLimite] = useState(searchParams.get('limite') ? Number(searchParams.get('limite')) : 10);
  const [total, setTotal] = useState(searchParams.get('total') ? Number(searchParams.get('total')) : 1);
  const [status, setStatus] = useState<string>(searchParams.get('status') ? searchParams.get('status') + '' : 'true');
  const [busca, setBusca] = useState(searchParams.get('busca') || '');
  const [notificacao, setNotificacao] = useState(0);
  const [open, setOpen] = useState(false);
  const [mensagemStatus, setMensagemStatus] = useState(1);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

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
  const { setAlert } = useContext(AlertsContext);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    buscaSubprefeitura();
    showNotificacao();
  }, [status, pagina, limite]);

  const showNotificacao = function () {
    var notification = searchParams.get('notification');

    if (notification) {
      setAlert(notification == '1' ? 'Subprefeitura alterada!' : 'Subprefeitura criada!',
      notification == '1' ? 'Subprefeitura alterada com sucesso.' : 'Subprefeitura criada com sucesso.',
        notification == '1' ? 'warning' : 'success', 3000, Check);
      router.push(pathname);
      buscaSubprefeitura();
    }
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString();
    },
    [searchParams]
  );

  const buscaSubprefeitura = async () => {
    subprefeituraServices.buscarTudo(status, pagina, limite, busca)
      .then((response: IPaginadoSubprefeitura) => {
        setTotal(response.total);
        setPagina(response.pagina);
        setLimite(response.limite);
        setSubprefeitura(response.data);
      });
  }

  const atualizarStatus = (tipo: number) => {
    if (tipo == 1) {
      subprefeituraServices.ativar(id)
        .then(() => {
          setAlert('Subprefeitura ativada!', 'Essa subprefeitura foi ativada e será exibida para seleção.', 'success', 3000, Check);
          buscaSubprefeitura();
        })
    } else if (tipo == 0) {
      subprefeituraServices.desativar(id)
        .then(() => {
          setAlert('Subprefeitura desativada!', 'Essa subprefeitura foi desativada e não será exibida para seleção.', 'warning', 3000, Check);
          buscaSubprefeitura();
        })
    }
  }

  const mudaPagina = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    novaPagina: number,
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


  const limpaFitros = () => {
    setBusca('');
    setStatus('true');
    setPagina(1);
    setLimite(10);
    router.push(pathname);
    buscaSubprefeitura();
  }

  return (
    <Content
      breadcrumbs={[
        { label: 'Subprefeitura', href: '/subprefeitura' }
      ]}
      titulo='Subprefeitura'
      pagina='subprefeitura'
    >

      <Snackbar
        variant="solid"
        color={mensagemStatus === 1 ? 'success' : 'warning'}
        size="lg"
        invertedColors
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ maxWidth: 360 }}
      >
        <div>
          <Typography level="title-lg">{title}</Typography>
          <Typography sx={{ mt: 1, mb: 2 }} level="title-md">{message}</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="solid" color="primary" onClick={() => (atualizarStatus(mensagemStatus), setOpen(false))}>
              Sim
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpen(false)}
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
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
          alignItems: 'end',
        }}
      >
        <IconButton size='sm' onClick={buscaSubprefeitura}><Refresh /></IconButton>
        <IconButton size='sm' onClick={limpaFitros}><Clear /></IconButton>
        <FormControl size="sm">
          <FormLabel>Status: </FormLabel>
          <Select
            size="sm"
            value={status}
            onChange={(_, newValue) => {
              router.push(pathname + '?' + createQueryString('status', String(newValue! || 'true')));
              setStatus(newValue! || 'true');
            }}
          >
            <Option value={'true'}>Ativos</Option>
            <Option value={'false'}>Inativos</Option>
            <Option value={'all'}>Todos</Option>
          </Select>
        </FormControl>
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Buscar: </FormLabel>
          <Input
            startDecorator={<Search fontSize='small' />}
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                router.push(pathname + '?' + createQueryString('busca', busca));
                buscaSubprefeitura();
              }
            }}
          />
        </FormControl>
      </Box>
      <Table hoverRow sx={{ tableLayout: 'auto' }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th style={{ textAlign: 'right' }}></th>
          </tr>
        </thead>
        <tbody>
          {
          subprefeitura ? subprefeitura.map((subprefeitura) => (
            parseInt(subprefeitura.status.toString()) !== (searchParams.get('status') === 'true' ? 0 : searchParams.get('status') === 'false' ? 1 : 2) ? (
              <tr key={subprefeitura.id} style={{
                cursor: 'pointer',
                backgroundColor: !subprefeitura.status ?
                    theme.vars.palette.danger.plainActiveBg : 
                    undefined
              }}>
                <td onClick={() => router.push('/subprefeitura/detalhes/' + subprefeitura.id)}>{subprefeitura.nome}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    {!subprefeitura.status ? (
                      <Tooltip title="Ativar Unidade" arrow placement="top">
                        <IconButton size="sm" color="success" onClick={() => (setTitle('Ativando!'), setMessage('Deseja ativar esta unidade?'), setOpen(true), setId(subprefeitura.id), setMensagemStatus(1))}>
                          <Check />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Desativar" arrow placement="top">
                        <IconButton title="Desativar" size="sm" color="danger" onClick={() => (setTitle('Desativando!'), setMessage('Deseja desativar esta unidade?'), setOpen(true), setId(subprefeitura.id), setMensagemStatus(0))}>
                          <Cancel />
                        </IconButton>
                      </Tooltip>
                    )}
                  </div>
                </td>
              </tr>
            ) : null
            
          )) : <tr><td colSpan={4}>Nenhuma unidade encontrada</td></tr>}
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
      <IconButton onClick={() => router.push('/subprefeitura/detalhes/')} color='primary' variant='soft' size='lg' sx={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
      }}><Add /></IconButton>
    </Content>
  );
}