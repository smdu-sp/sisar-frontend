'use client'

import Content from '@/components/Content';
import { Box, Button, Chip, ChipPropsColorOverrides, ColorPaletteProp, FormControl, FormLabel, IconButton, Input, List, ListItem, ModalClose, ModalOverflow, Option, Select, Snackbar, Stack, Switch, Tab, TabList, TabPanel, Table, Tabs, Textarea, Tooltip, Typography, tabClasses } from '@mui/joy';
import { TablePagination } from '@mui/material';
import * as inicialServices from '@/shared/services/inicial.services';
import * as admissibilidadeServices from '@/shared/services/admissibilidade.services';
import * as parecerServices from '@/shared/services/parecer_admissibilidade.service';
import { IAdmissibilidade, IPaginadoAdmissibilidade } from '@/shared/services/admissibilidade.services';
import { IInicial, IPaginatedInicial } from '@/shared/services/inicial.services';
import { useCallback, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Add, Check, Clear, Refresh, Search } from '@mui/icons-material';
import { OverridableStringUnion } from '@mui/types';
import { AlertsContext } from '@/providers/alertsProvider';
import BackHandIcon from '@mui/icons-material/BackHand';
import PostAddIcon from '@mui/icons-material/PostAdd';
import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import * as comum from "@/shared/services/comum.services";
import MenuIcon from '@mui/icons-material/Menu';
import { ModalDialogProps } from '@mui/joy/ModalDialog';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { IPaginadoParecer, IParecer } from '@/shared/services/parecer_admissibilidade.service';


export default function Admissibilidade() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [open, setOpen] = React.useState<boolean>(false);
  const [admissibilidade, setAdmissibilidade] = useState<IAdmissibilidade[]>([]);
  const [parecer, setParecer] = useState<IParecer[]>([]);
  const [pareceres, setPareceres] = useState<IParecer[]>([]);
  const [pagina, setPagina] = useState(searchParams.get('pagina') ? Number(searchParams.get('pagina')) : 1);
  const [limite, setLimite] = useState(searchParams.get('limite') ? Number(searchParams.get('limite')) : 10);
  const [total, setTotal] = useState(searchParams.get('total') ? Number(searchParams.get('total')) : 1);
  const [busca, setBusca] = useState(searchParams.get('busca') || '');
  const [statusModal, setStatusModal] = useState<boolean>(false);
  const [statusAtual, setStatusAtual] = useState<number>(0);
  const [reconsiderado, setReconsiderado] = useState(true)
  const [parecer_admissibilidade_id, setParecer_admissibilidade_id] = useState("");
  const [idInicial, setIdInicial] = useState("");
  const [modal, setModal] = useState<any>([]);
  const [layout, setLayout] = React.useState<ModalDialogProps['layout'] | undefined>(
    undefined,
  );
  const [textoMotivo, setTextoMotivo] = useState('')
  const [openModalMotivo, setOpenModalMotivo] = useState(false)
  const [editMotivo, setEditMotivo] = useState(false)
  const [idParecer, setIdParecer] = useState('')
  const [index, setIndex] = React.useState(0);
  const [statusMotivo, setStatusMotivo] = useState('')

  const colors = [
    "success",
    "warning",
    "danger",
    "neutral",
    "primary"
  ]
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

  const atualizar = async () => {
    console.log(parecer_admissibilidade_id);
    await admissibilidadeServices.atualizarId(modal[2], { status: 3, parecer_admissibilidade_id, data_decisao_interlocutoria: new Date() })
    setOpen(false)
    buscaAdmissibilidade();
    setAlert('Status atualizado!', `O Status foi para ${status[statusModal ? 3 : 2].label}`, 'success', 3000, Check);
    setStatusModal(true)
    setParecer_admissibilidade_id("")
  }

  const buscarParecer = () => {
    parecerServices.buscarTudo()
      .then((response: IPaginadoParecer) => {
        setParecer(response.data);
      });
  }

  useEffect(() => {
    buscarParecer()
  }, [])

  const buscaAdmissibilidade = () => {
    admissibilidadeServices.buscarTudo(pagina, limite, statusFiltro)
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

  const motivos = [
    "Não Cumprimento de Requisito",
    "Ausência de Documentos",
    "Documentação não conforme com descrição solicitada",
    "Não está de acordo com os Parâmetros Urbanísticos",
    "Não foi dada baixa no pagamento das guias",
    "N/A"
  ]


  const mudaPagina = (
    _: React.MouseEvent<HTMLButtonElement> | null, novaPagina: number,
  ) => {
    router.push(pathname + '?' + createQueryString('pagina', String(novaPagina + 1)));
    setPagina(novaPagina + 1);
  };

  function dataPrazo(date: any, status: any) {
    var color
    switch (status) {
      case 0:
        date = "Admitido"
        color = colors[3]
        break;
      case 1:
        var diasRestantes = new Date(date).getDate() + 15 - parseInt((new Date().getDate()).toString());
        date = diasRestantes >= 0 ? diasRestantes + " Dias Restantes" : "Em Atraso"
        var dias = parseInt(diasRestantes.toString().split(" ")[0])
        color = dias <= 15 && dias >= 10 ? colors[0] : dias <= 9 && dias >= 6 ? colors[1] : dias <= 5 ? colors[2] : null;
        break;
      case 2:
        date = "Sem prazo"
        color = colors[3]
        break;
      case 3:
        var diasRestantes = new Date(date).getDate() + 15 - parseInt((new Date().getDate()).toString());
        date = diasRestantes >= 0 ? diasRestantes + " Dias Restantes" : "Em Atraso"
        var dias = parseInt(diasRestantes.toString().split(" ")[0])
        color = dias <= 15 && dias >= 10 ? colors[0] : dias <= 9 && dias >= 6 ? colors[1] : dias <= 5 ? colors[2] : null;
        break;
    }
    return [date, color];
  }

  const desativarMotivo = (motivo: string) => {
    parecerServices.desativar(idParecer)
      .then((response) => {
        if (response) {
          setAlert('Motivo desativado!', `O ${motivo} foi desativado`, 'warning', 3000, CancelIcon);
          setOpenModalMotivo(false)
          buscarParecer()
        }
      })
  }

  const criarMotivo = () => {
    const JParecer = {
      parecer: textoMotivo,
      status: 1
    }
    parecerServices.criar(JParecer).
      then((response) => {
        if (response) {
          setAlert('Motivo Criado!', `O motivo ${response.parecer} foi criado`, 'success', 3000, Check);
          buscarParecer()
          setTextoMotivo('')
        } else {
          setAlert('Erro ao criar!', `O motivo ${textoMotivo} não foi possivel criar`, 'danger', 3000, Check);
        }
      })
  }

  const atualizarMotivo = async () => {
    const JParecer = {
      parecer: textoMotivo
    }
    await parecerServices.atualizar(idParecer, JParecer)
      .then((response) => {
        if (response) {
          setEditMotivo(false)
          setAlert('Motivo alterado!', `O ${textoMotivo} foi alterado`, 'success', 3000, Check);
          setTextoMotivo('')
          buscarParecer()
        }
      })
  }

  const mudaLimite = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    router.push(pathname + '?' + createQueryString('limite', String(event.target.value)));
    setLimite(parseInt(event.target.value, 10));
    setPagina(1);
  };

  const status: { label: string, color: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides> | undefined }[] = [
    { label: 'Admissivel', color: 'success' },
    { label: 'Em Análise', color: 'primary' },
    { label: 'Inadmissível', color: 'danger' },
    { label: 'Em Reconsideração', color: 'warning' },
  ]


  return (
    <Content
      titulo='Admissibilidade'
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
        <IconButton size='sm' onClick={() => { buscaAdmissibilidade(); }}><Refresh /></IconButton>
        <IconButton size='sm' ><Clear /></IconButton>
        <Select
          size="sm"
          value={statusFiltro}
          onChange={(_, value) => { setStatusFiltro(value as number); }}
        >
          <Option value={-1}>Todos</Option>
          <Option value={0}>Admitidos</Option>
          <Option value={1}>Em admissão</Option>
          <Option value={2}>Inadmissiveis</Option>
          <Option value={3}>Reconsideração</Option>
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
                buscaAdmissibilidade();
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
                {/* <th>Parecer</th> */}
                <th>Data Criação</th>
                <th>Status</th>
                <th>Prazo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {admissibilidade && admissibilidade.length > 0 ? admissibilidade.map((admissibilidade: IAdmissibilidade) => (
                <Tooltip key={admissibilidade.inicial_id} title={motivos[admissibilidade.motivo]} followCursor>
                  <tr key={admissibilidade.inicial_id} style={{ cursor: 'default' }}>
                    <td>{admissibilidade.inicial_id}</td>
                    <td>{admissibilidade.inicial?.sei ? comum.formatarSei(admissibilidade.inicial?.sei) : ''}</td>
                    <td>{admissibilidade.inicial?.envio_admissibilidade ? new Date(admissibilidade.inicial?.envio_admissibilidade).toLocaleDateString('pt-BR') : ''}</td>
                    {/* <td>{admissibilidade.parecer === true ? 'true' : 'false'}</td> */}
                    <td>{admissibilidade.criado_em ? new Date(admissibilidade.criado_em).toLocaleDateString('pt-BR') : ''}</td>
                    <td>
                      {admissibilidade.status !== undefined && status[admissibilidade.status] && (
                        <Chip color={status[admissibilidade.status].color}>
                          {status[admissibilidade.status].label}
                        </Chip>
                      )}
                    </td>
                    <td>
                      {admissibilidade.inicial?.data_limiteSmul !== undefined && (
                        <Chip color={dataPrazo(admissibilidade.inicial?.data_limiteSmul, admissibilidade.status)[1]}>
                          {dataPrazo(admissibilidade.inicial?.data_limiteSmul, admissibilidade.status)[0]}
                        </Chip>
                      )}
                    </td>
                    <td>{admissibilidade.status !== 0 &&
                      <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                        { admissibilidade.status !== 2 && admissibilidade.status !== 3 &&
                          <Tooltip title="Inadmitir" variant='outlined'>
                            <IconButton color='warning' variant='soft' onClick={() => { setOpen(true); setModal([admissibilidade.inicial?.sei, admissibilidade.status, admissibilidade.inicial_id, admissibilidade.reconsiderado]); setReconsiderado(admissibilidade.reconsiderado); setStatusAtual(admissibilidade.status) }}>
                              <BackHandIcon />
                            </IconButton>
                          </Tooltip>
                        }
                        <Tooltip title="Admissivel" variant='outlined'>
                          <IconButton color='success' variant='soft' onClick={() => { router.push(`/inicial/detalhes/${admissibilidade.inicial_id}?tab=2`); }}>
                            <PostAddIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>}
                    </td>
                  </tr>
                </Tooltip>

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

      <React.Fragment>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog>
            <DialogTitle>Inadimitir Processo</DialogTitle>
            <DialogContent>Preencha os dados para inadimitir.</DialogContent>
            <form
              onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                setOpen(false);
              }}
            >
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Sei</FormLabel>
                  <Input value={comum.formatarSei(modal[0])} required />
                </FormControl>
                <FormControl sx={{ display: 'flex' }}>
                  <FormLabel>Motivo</FormLabel>
                  <Select
                    size="sm"
                    value={parecer_admissibilidade_id}
                    placeholder="Motivo"
                    onChange={(_, v) => { v && setParecer_admissibilidade_id(v) }}
                    startDecorator={
                      <IconButton sx={{ zIndex: 9999 }} onClick={() => { setLayout('center') }}>
                        <MenuIcon />
                      </IconButton>
                    }
                  >
                    {parecer && parecer.length > 0 && parecer.map((item) => <Option key={item.id} value={item.id}>{item.parecer}</Option>)}
                  </Select>
                </FormControl>
                <Button onClick={() => atualizar()}>Enviar</Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </React.Fragment>
      <React.Fragment>
        <Snackbar
          variant="solid"
          color="warning"
          size="lg"
          invertedColors
          open={openModalMotivo}
          onClose={() => setOpenModalMotivo(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ maxWidth: 360 }}
        >
          <div>
            <Typography level="title-lg">{statusMotivo} Motivo</Typography>
            <Typography sx={{ mt: 1, mb: 2 }} level="title-md">Certeza que deseja {statusMotivo} este motivo?</Typography>
            <Stack direction="row" spacing={1}>
              <Button variant="solid" color="primary" onClick={() => desativarMotivo('motivo')}>
                Sim
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpenModalMotivo(false)}
              >
                Não
              </Button>
            </Stack>
          </div>
        </Snackbar>

        <Box sx={{ flexGrow: 1, m: -2, overflowX: 'hidden' }}>

        </Box>
        <Modal
          open={!!layout}
          onClose={() => {
            setLayout(undefined);
          }}
        >
          <ModalOverflow>
            <ModalDialog aria-labelledby="modal-dialog-overflow" layout={layout} sx={{ minWidth: '500px' }}>
              <ModalClose />
              <Typography id="modal-dialog-overflow" level="h2">
                Motivos
              </Typography>
              <FormControl
                orientation="horizontal"
                sx={{ gap: 1, borderRadius: 'sm', width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column' }}
              >
                {editMotivo ?
                  <Button variant='soft' color='primary' sx={{ width: '100%' }} onClick={() => { atualizarMotivo() }}>Salvar</Button>
                  :
                  <Button variant='soft' color='success' sx={{ width: '100%' }} onClick={() => { criarMotivo() }}>Adicionar</Button>
                }
                <Input placeholder="Digite seu texto de motivo" variant="outlined" value={textoMotivo} onChange={(e) => setTextoMotivo(e.target.value)} />
              </FormControl>
              <Tabs
                aria-label="Pipeline"
                value={index}
                onChange={(event, value) => setIndex(value as number)}
              >
                <TabList
                  sx={{
                    pt: 1,
                    justifyContent: 'center',
                    [`&& .${tabClasses.root}`]: {
                      flex: 'initial',
                      bgcolor: 'transparent',
                      '&:hover': {
                        bgcolor: 'transparent',
                      },
                      [`&.${tabClasses.selected}`]: {
                        color: 'primary.plainColor',
                        '&::after': {
                          height: 2,
                          borderTopLeftRadius: 3,
                          borderTopRightRadius: 3,
                          bgcolor: 'primary.500',
                        },
                      },
                    },
                  }}
                >
                  <Tab indicatorInset >
                    Ativos
                  </Tab>
                  <Tab indicatorInset onChange={() => buscarParecer()}>
                    Inativos
                  </Tab>
                </TabList>
                <Box
                  sx={{
                    background: 'var(--bg)',
                    boxShadow: '0 0 0 100vmax var(--bg)',
                    clipPath: 'inset(0 -100vmax)'
                  }}
                >
                  <TabPanel value={0} onChange={() => buscarParecer()}>
                    <List>
                      {
                        parecer && parecer.length > 0 ? parecer.map((parecer: IParecer) => (
                          parecer.status === 1 ?
                            <ListItem key={parecer.id} sx={{ display: 'flex', justifyContent: 'space-between' }} value={parecer.id}>
                              {parecer.parecer}
                              <Box>
                                <IconButton color='warning' onClick={() => { setEditMotivo(true); setTextoMotivo(parecer.parecer); setIdParecer(parecer.id) }} >
                                  <EditIcon />
                                </IconButton>
                                <IconButton color='danger' onClick={() => { setOpenModalMotivo(true); setIdParecer(parecer.id); setStatusMotivo("Desativar") }} >
                                  <CancelIcon />
                                </IconButton>
                              </Box>
                            </ListItem>
                            : ''
                        )) : <ListItem>Nenhum parecer cadastrado</ListItem>
                      }
                    </List>
                  </TabPanel>
                  <TabPanel value={1} onChange={() => buscarParecer()}>
                    <List>
                      {
                        parecer && parecer.length > 0 ? parecer.map((parecer: IParecer) => (
                          parecer.status === 0 ?
                            <ListItem key={parecer.id} sx={{ display: 'flex', justifyContent: 'space-between' }} value={parecer.id}>
                              {parecer.parecer}
                              <Box>
                                <IconButton color='warning' onClick={() => { setEditMotivo(true); setTextoMotivo(parecer.parecer); setIdParecer(parecer.id) }} >
                                  <EditIcon />
                                </IconButton>
                                <IconButton color='success' onClick={() => { setOpenModalMotivo(true); setIdParecer(parecer.id); setStatusMotivo("Ativar") }} >
                                  <Check />
                                </IconButton>
                              </Box>
                            </ListItem>
                            : ''
                        )) : <ListItem>Nenhum parecer cadastrado</ListItem>
                      }
                    </List>
                  </TabPanel>
                </Box>
              </Tabs>
            </ModalDialog>
          </ModalOverflow>
        </Modal>
      </React.Fragment>

    </Content >
  );
}
