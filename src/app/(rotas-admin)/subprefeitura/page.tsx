'use client'

import Content from '@/components/Content';
import { Suspense, useCallback, useContext, useEffect, useState } from 'react';
import * as subprefeituraServices from '@/shared/services/subprefeitura.services';
import { Box, Button, Card, CardActions, CardOverflow, ChipPropsColorOverrides, CircularProgress, ColorPaletteProp, DialogContent, DialogTitle, FormControl, FormHelperText, FormLabel, IconButton, Input, Modal, ModalDialog, Option, Select, Skeleton, Snackbar, Stack, Table, Tooltip, Typography, useTheme } from '@mui/joy';
import { Add, Cancel, Check, Clear, Edit, Refresh, Search, Warning } from '@mui/icons-material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AlertsContext } from '@/providers/alertsProvider';
import { TablePagination } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { IPaginadoSubprefeitura } from '@/shared/services/subprefeitura.services';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISubprefeitura } from "@/shared/services/subprefeitura.services";
import {
  infer as Infer,
  number,
  object,
  string,
} from "zod";

const schema = object({
  nome: string().min(2, { message: "O nome deve ter pelo menos 2 letras" }),
  sigla: string().min(2, { message: "A sigla deve ter pelo menos 2 letras" }),
  status: number().min(0).max(1)
});
type Schema = Infer<typeof schema>;


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
  const [openComfirm, setOpenComfirm] = useState(false);
  const [openNovaSub, setOpenNovaSub] = useState(false);
  const [mensagemStatus, setMensagemStatus] = useState(1);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [idSubprefeitura, setIdSubprefeitura] = useState<string>('aawd');
  const [nome, setNome] = useState<string>('');
  const [sigla, setSigla] = useState<string>('');
  const [statusModal, setStatusModal] = useState<number>(1);
  const [carregando, setCarregando] = useState<boolean>(true);
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
  }, [status, pagina, limite]);


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
          limpaCamposForm();
          buscaSubprefeitura();
        })
    } else if (tipo == 0) {
      subprefeituraServices.desativar(id)
        .then(() => {
          setAlert('Subprefeitura desativada!', 'Essa subprefeitura foi desativada e não será exibida para seleção.', 'warning', 3000, Check);
          limpaCamposForm();
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

  useEffect(() => {
    if (id) {
      subprefeituraServices.buscarPorId(id)
        .then((response: ISubprefeitura) => {
          setIdSubprefeitura(response.id);
          setNome(response.nome);
          setSigla(response.sigla);
          setStatus(response.status.toString());
          setCarregando(false);
        });
      setCarregando(true);
    } else {
      setCarregando(false);
    }
  }, [id]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful }
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(schema),
    values: {
      nome,
      sigla,
      status: statusModal
    }
  });

  const onSubmit = (data: Schema) => {
    if (!id) {
      subprefeituraServices.criar(data)
        .then(() => {
          setAlert('Subprefeitura criada!', 'Essa subprefeitura foi criada e será exibida.', 'success', 3000, Check);
          !isSubmitSuccessful
          data.nome = '';
          data.sigla = '';
          data.status = 1;
          setOpenNovaSub(false);
          limpaCamposForm();
          buscaSubprefeitura();
        })
    } else {
      subprefeituraServices.atualizar({ id, ...data })
        .then(() => {
          setAlert('Subprefeitura atualizada!', 'Subprefeitura foi atualiza com sucesso.', 'success', 3000, Check);
          setOpenNovaSub(false);
          limpaCamposForm();
          buscaSubprefeitura();
        })
    }
  }

  const limpaCamposForm = () => {
    setNome('');
    setSigla('');
    setId('');
    setStatusModal(1);
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
        open={openComfirm}
        invertedColors
        onClose={() => setOpenComfirm(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ maxWidth: 360 }}
      >
        <div>
          <Typography level="title-lg">{title}</Typography>
          <Typography sx={{ mt: 1, mb: 2 }} level="title-md">{message}</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="solid" color="primary" onClick={() => (atualizarStatus(mensagemStatus), setOpenComfirm(false))}>
              Sim
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpenComfirm(false)}
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
            <th>Sigla</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}></th>
          </tr>
        </thead>
        <tbody>
          {subprefeitura && subprefeitura.length > 0 ? subprefeitura.map((subprefeitura) => (
            parseInt(subprefeitura.status.toString()) !==
              (searchParams.get('status') ?
                (searchParams.get('status') === 'true' ? 0 : searchParams.get('status') === 'false' ? 1 : 2)
                : 0) ? (
              <tr key={subprefeitura.id} style={{
                cursor: 'pointer',
                backgroundColor: !subprefeitura.status ?
                  theme.vars.palette.danger.plainActiveBg :
                  undefined
              }}>
                <td onClick={() => {setOpenNovaSub(true); setNome(subprefeitura.nome); setSigla(subprefeitura.sigla); setId(subprefeitura.id)}}>{subprefeitura.nome}</td>
                <td onClick={() => {setOpenNovaSub(true); setNome(subprefeitura.nome); setSigla(subprefeitura.sigla); setId(subprefeitura.id)}}>{subprefeitura.sigla}</td>
                <td onClick={() => {setOpenNovaSub(true); setNome(subprefeitura.nome); setSigla(subprefeitura.sigla); setId(subprefeitura.id)}}>{subprefeitura.status == 1 ? "Ativo" : "Inativo"}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    {!subprefeitura.status ? (
                      <Tooltip title="Ativar Unidade" arrow placement="top">
                        <IconButton size="sm" color="success" onClick={() => (setTitle('Ativando!'), setMessage('Deseja ativar esta unidade?'), setOpenComfirm(true), setId(subprefeitura.id), setMensagemStatus(1))}>
                          <Check />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Desativar" arrow placement="top">
                        <IconButton title="Desativar" size="sm" color="danger" onClick={() => (setTitle('Desativando!'), setMessage('Deseja desativar esta unidade?'), setOpenComfirm(true), setId(subprefeitura.id), setMensagemStatus(0))}>
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
      <IconButton onClick={() => setOpenNovaSub(true)} color='primary' variant='soft' size='lg' sx={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
      }}><Add /></IconButton>

      <Modal open={openNovaSub} onClose={() => { setOpenNovaSub(false); limpaCamposForm() }}>
        <ModalDialog>
          <DialogTitle>{ !id ? "Adicionar Subprefeitura" : "Editar subprefeitura" }</DialogTitle>
          <DialogContent>{ !id ? 'Adicione uma nova subprefeitura para continuar' : 'Edite a subprefeitura para continuar'}</DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ maxWidth: 600, minWidth: 600 }}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ flexGrow: 0.9 }} error={Boolean(errors.nome)}>
                    <FormLabel>Nome</FormLabel>
                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                      name="nome"
                      control={control}
                      defaultValue={nome}
                      render={({ field: { ref, ...field } }) => {
                        return (<>
                          <Input
                            type="text"
                            startDecorator={<AccountBalanceIcon />}
                            placeholder="Nome"
                            error={Boolean(errors.nome)}
                            {...field}
                          />
                          {errors.nome && <FormHelperText color="danger">
                            {errors.nome?.message}
                          </FormHelperText>}
                        </>);
                      }}
                    />}
                  </FormControl>
                  <FormControl sx={{ flexGrow: 0.1 }} error={Boolean(errors.sigla)}>
                    <FormLabel>Sigla</FormLabel>
                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                      name="sigla"
                      control={control}
                      defaultValue={sigla}
                      render={({ field: { ref, ...field } }) => {
                        return (<>
                          <Input
                            type="text"
                            startDecorator={<AccountBalanceIcon />}
                            placeholder="Sigla"
                            error={Boolean(errors.sigla)}
                            {...field}
                          />
                          {errors.sigla && <FormHelperText>
                            {errors.sigla?.message}
                          </FormHelperText>}
                        </>);
                      }}
                    />}
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ flexGrow: 1 }} error={Boolean(errors.status)}>
                    <FormLabel>Status</FormLabel>
                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                      name="status"
                      control={control}
                      defaultValue={statusModal}
                      render={({ field: { ref, ...field } }) => {
                        return (<>
                          <Select
                            startDecorator={<AccountBalanceIcon />}
                            placeholder="Status"
                            {...field}
                            onChange={(_, value) => field.onChange(value)}
                          >
                            <Option value={1}>Ativo</Option>
                            <Option value={0}>Inativo</Option>
                          </Select>
                          {errors.status && <FormHelperText>
                            {errors.status?.message}
                          </FormHelperText>}
                        </>);
                      }}
                    />}
                  </FormControl>

                </Stack>
              </Stack>
              <CardOverflow>
                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                  <Button size="sm" variant="outlined" color="neutral" onClick={() => { setOpenNovaSub(false); limpaCamposForm() }}>
                    Cancelar
                  </Button>
                  <Button size="sm" variant="solid" color="primary" type="submit" disabled={!isValid}>
                    {isSubmitSuccessful ? <CircularProgress variant="solid" /> : "Salvar"}
                  </Button>
                </CardActions>
              </CardOverflow>
            </Box>
          </form>
        </ModalDialog>
      </Modal>

    </Content >
  );
}
