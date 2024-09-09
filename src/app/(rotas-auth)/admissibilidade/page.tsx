'use client'

import Content from '@/components/Content';
import { Box, Button, Chip, ChipPropsColorOverrides, ColorPaletteProp, FormControl, FormLabel, IconButton, Input, Option, Select, Snackbar, Stack, Tab, TabList, TabPanel, Table, Tabs, Textarea, Tooltip, Typography, tabClasses } from '@mui/joy';
import { TablePagination } from '@mui/material';
import * as inicialServices from '@/shared/services/inicial.services';
import * as admissibilidadeServices from '@/shared/services/admissibilidade.services';
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

export default function Admissibilidade() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [open, setOpen] = React.useState<boolean>(false);
  const [admissibilidade, setAdmissibilidade] = useState<IAdmissibilidade[]>([]);
  const [pagina, setPagina] = useState(searchParams.get('pagina') ? Number(searchParams.get('pagina')) : 1);
  const [limite, setLimite] = useState(searchParams.get('limite') ? Number(searchParams.get('limite')) : 10);
  const [total, setTotal] = useState(searchParams.get('total') ? Number(searchParams.get('total')) : 1);
  const [busca, setBusca] = useState(searchParams.get('busca') || '');
  const [statusModal, setStatusModal] = useState<boolean>(false);
  const [statusAtual, setStatusAtual] = useState<number>(0);
  const [reconsiderado, setReconsiderado] = useState(true)
  const [motivo, setMotivo] = useState(0);
  const [modal, setModal] = useState<any>([]);
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
    await admissibilidadeServices.atualizarId(modal[2], { status: statusModal ? 3 : 2, motivo, reconsiderado: statusModal === true ? (reconsiderado === null  ? false : true) : false })
    setOpen(false)
    buscaAdmissibilidade();
    setAlert('Status atualizado!', `O Status foi para ${status[statusModal ? 3 : 2].label}`, 'warning', 3000, Check);
    setStatusModal(true)
    setMotivo(0)
  }


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
                    <td>{admissibilidade.status !== 0 && <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                      { admissibilidade.reconsiderado !== true ?
                        <Tooltip title="Inadmitir" variant='outlined'>
                          <IconButton color='warning' variant='soft' onClick={() => { setOpen(true); setModal([admissibilidade.inicial?.sei, admissibilidade.status, admissibilidade.inicial_id, admissibilidade.reconsiderado]); setReconsiderado(admissibilidade.reconsiderado); setStatusAtual(admissibilidade.status) }}><BackHandIcon />
                          </IconButton>
                        </Tooltip>
                        : null
                      }
                      {admissibilidade.status !== 2 &&
                        <Tooltip title="Admissivel" variant='outlined'>
                          <IconButton color='success' variant='soft' onClick={() => { router.push(`/inicial/detalhes/${admissibilidade.inicial_id}?tab=2`); }}>
                            <PostAddIcon />
                          </IconButton>
                        </Tooltip>
                      }

                    </Stack>}</td>
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
            <DialogTitle>Gerenciar Processo</DialogTitle>
            <DialogContent>Preencha os dados para gerenciamento.</DialogContent>
            <form
              onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                setOpen(false);
              }}
            >
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Sei</FormLabel>
                  <Input value={modal[0]} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select
                    size="sm"
                    value={statusModal}
                    placeholder="Status"
                    onChange={(_, value) => { setStatusModal(value as boolean); }}
                  >
                    {
                       <Option value={false}>Inadmitir</Option>
                    }
                    {reconsiderado === false || reconsiderado === null ?
                      <Option value={true}>Reconsideração</Option>
                      : null
                    }
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Motivo</FormLabel>
                  <Select
                    size="sm"
                    value={motivo}
                    placeholder="Motivo"
                    onChange={(_, v) => { setMotivo(v ? v : 0); }}
                  >
                    <Option value={0}>Não Cumprimento de Requisito</Option>
                    <Option value={1}>Ausência de Documentos</Option>
                    <Option value={2}>Documentação não conforme com descrição solicitada</Option>
                    <Option value={3}>Não está de acordo com os Parâmetros Urbanísticos</Option>
                    <Option value={4}>Não foi dada baixa no pagamento das guias</Option>
                    <Option value={5}>N/A</Option>
                  </Select>
                </FormControl>
                <Button onClick={() => atualizar()}>Enviar</Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    </Content>
  );
}
