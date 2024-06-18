'use client'

import Content from '@/components/Content';
import CardAviso from '@/components/CardAviso';
import * as React from 'react';
import { Button, Chip, ChipPropsColorOverrides, ColorPaletteProp, DialogContent, DialogTitle, FormControl, FormLabel, IconButton, Input, Modal, ModalDialog, Stack, Tab, TabList, TabPanel, Table, Tabs, Textarea, tabClasses } from '@mui/joy';
import { TablePagination } from '@mui/material';
import * as inicialServices from '@/shared/services/inicial.services';
import { IInicial, IPaginatedInicial } from '@/shared/services/inicial.services';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Add, Check } from '@mui/icons-material';
import { OverridableStringUnion } from '@mui/types';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import * as reunioes from '@/shared/services/reunioes.services';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import ListDecoration from '../../components/ListDecoration';
import Icon from '@mui/material/Icon';;
import { Card, CardContent, Grid, Option, Select, Sheet, Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import * as avisos from '@/shared/services/avisos.services'
import { ICreateAvisos } from '@/shared/services/avisos.services'
import CircleIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import Link from '@mui/joy/Link';
import { AlertsContext } from '@/providers/alertsProvider';
import 'dayjs/locale/pt-br'; // Importe a localização desejada

dayjs.locale('pt-br');

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [iniciais, setIniciais] = useState<IInicial[]>([]);
  const [pagina, setPagina] = useState(searchParams.get('pagina') ? Number(searchParams.get('pagina')) : 1);
  const [limite, setLimite] = useState(searchParams.get('limite') ? Number(searchParams.get('limite')) : 10);
  const [total, setTotal] = useState(searchParams.get('total') ? Number(searchParams.get('total')) : 1);
  const today = new Date();
  const [data, setData] = useState(dayjs(today.toLocaleDateString('pt-BR').split('/').reverse().join('-')));
  const [dataCard, setDataCard] = useState('');
  const [diass, setDias] = useState<number[]>([]);
  const initialValue = dayjs(today.toLocaleDateString('pt-BR').split('/').reverse().join('-'));
  const colors = ['primary', 'warning', 'success', 'success'] as const;
  const [reuniao, setReuniao] = useState([]);
  const [processos, setProcessos] = useState([]);
  const [tipoData, setTipoData] = useState(0);
  const [open, setOpen] = React.useState<boolean>(false);
  const [openNotf, setOpenNotf] = React.useState<boolean>(false);
  const [inicial, setInicial] = useState('');
  const [dataRemarcacao, setDataRemarcacao] = useState(dayjs(today.toLocaleDateString('pt-BR').split('/').reverse().join('-')));
  const [motivo, setMotivo] = useState('');
  const [dados, setDados] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [titulo, setTitulo] = useState('');
  const [dataAviso, setDataAviso] = useState<Date>(new Date());
  const router = useRouter();
  const { setAlert } = React.useContext(AlertsContext);


  const busca = (mes: any) => {
    setDias([]);
    if (tipoData == 0) {
      reunioes.buscarPorMesAno(mes.toString(), data.year().toString())
        .then((response) => {
          if (Array.isArray(response)) {
            for (let i = 0; i < response.length; i++) {
              setDias(prevDias => {
                if (response[i].nova_data_reuniao != null) {
                  return [...prevDias, parseInt(response[i].nova_data_reuniao.toString().split("T")[0].split("-")[2])];
                } else {
                  return [...prevDias, parseInt(response[i].data_reuniao.toString().split("T")[0].split("-")[2])];
                }
              });
            }
          } else {
            setDias([]);
          }
        })
        .catch((error) => {
          console.error("erro:", error);
        });
    } else if (tipoData == 1) {
      inicialServices.buscarPorMesAno(mes.toString(), data.year().toString())
        .then((response) => {
          if (Array.isArray(response)) {
            for (let i = 0; i < response.length; i++) {
              setDias(prevDias => {
                return [...prevDias, parseInt(response[i].toString().split("T")[0].split("-")[2])];
              });
            }
          } else {
            setDias([]);
          }
        })
        .catch((error) => {
          console.error("erro:", error);
        });
    } else if (tipoData == 2) {
      avisos.buscarPorMesAno(mes.toString(), data.year().toString())
        .then((response) => {
          if (Array.isArray(response)) {
            for (let i = 0; i < response.length; i++) {
              setDias(prevDias => {
                if (response[i].nova_data_reuniao != null) {
                  return [...prevDias, parseInt(response[i].data.toString().split("T")[0].split("-")[2])];
                } else {
                  return [...prevDias, parseInt(response[i].data.toString().split("T")[0].split("-")[2])];
                }
              });
            }
          } else {
            setDias([]);
          }
        })
        .catch((error) => {
          console.error("erro:", error);
        });
    }

  };

  const ServerDay = (props: PickersDayProps<Dayjs> & { highlightedDays?: number[], projetosDay?: number[] }) => {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? <Icon component={CircleIcon} sx={{ width: 13, height: 13, fontWeight: 'bold', mr: 1 }} color={colors[tipoData]} /> : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  };

  const [isLoading, setIsLoading] = useState(false);


  const buscar_data = () => {
    if (tipoData == 0) {
      reunioes.buscarPorData(data.year() + '-' + ((data.month() + 1).toString().length == 1 ? '0' + (data.month() + 1) : data.month() + 1) + '-' + (data.date().toString().length == 1 ? '0' + data.date() : data.date().toString()))
        .then((response) => {
          console.log(response);
          setDados(response);
        });
    } else if (tipoData == 1) {
      inicialServices.buscarPorDataProcesso(data.year() + '-' + ((data.month() + 1).toString().length == 1 ? '0' + (data.month() + 1) : data.month() + 1) + '-' + (data.date().toString().length == 1 ? '0' + data.date() : data.date().toString()))
        .then((response) => {
          console.log(response);
          setDados(response);
        });
    } else if (tipoData == 2) {
      avisos.buscarDia(data.year() + '-' + ((data.month() + 1).toString().length == 1 ? '0' + (data.month() + 1) : data.month() + 1) + '-' + (data.date().toString().length == 1 ? '0' + data.date() : data.date().toString()))
        .then((response) => {
          setDados(response);
        });
    }
  }

  const criarAvisos = () => {
    avisos.criar({ titulo, descricao, data: dataAviso })
      .then((response: avisos.IAvisos) => {
        if (response) {
          setAlert('Aviso criado', 'Aviso criado com sucesso!', 'success', 3000, Check);
          busca(dataAviso.getMonth() + 1);
          setOpenNotf(false)
          setTitulo('');
          setDescricao('');
          setDataAviso(today)
        }
      })
  }


  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString();
    },
    [searchParams]
  );

  const reagendarReuniao = (id: string) => {
    const dataRemak = new Date(dataRemarcacao.valueOf());
    reunioes.reagendarReuniao(id, dataRemak, motivo).then((response) => {
      if (response) {
        setOpen(false);
        setMotivo('');
        setDias([]);
        buscar_data();
        setDataRemarcacao(dayjs(today.toLocaleDateString('pt-BR').split('/').reverse().join('-')));
        busca(new Date(dataRemarcacao.valueOf()).toLocaleDateString('pt-BR').split('/')[1]);
        setAlert('Reagendação feita', 'Reunião reagendada com sucesso!', 'success', 3000, Check);
      }
    })
  }

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


  useEffect(() => {
    buscaIniciais();
    busca(data.month() + 1);
  }, [pagina, limite, tipoData]);

  useEffect(() => {
    var datacard = data.year() + '-' + (data.month() + 1) + '-' + data.date();
    setDataCard(new Date(datacard).toLocaleDateString('pt-BR'));
    buscar_data();
  }, [data]);

  return (
    <Content
      titulo='Página Inicial'
      pagina='/'
    >

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'end' }}>
            <DateCalendar
              defaultValue={initialValue}
              loading={isLoading}
              onMonthChange={(newDate) => {
                busca(newDate.month() + 1);
              }}
              renderLoading={() => <DayCalendarSkeleton />}
              value={data}
              onChange={(newDate) => { setData(newDate); }}
              slots={{
                day: ServerDay,
              }}
              reduceAnimations={false}
              slotProps={{
                day: {
                  highlightedDays: diass,
                } as any,
              }}
            />
            <Box sx={{ position: 'absolute', right: 18, bottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'end', gap: 2, justifyContent: 'center' }}>
              <Select value={tipoData} onChange={(_, v) => { setTipoData(v ? v : 0); setDados([]); }} sx={{ minHeight: 20, minWidth: 120, fontSize: '14px', mb: 0.5 }} color={colors[tipoData]}>
                <Option value={0} sx={{ fontSize: '14px' }} color='primary'>Reuniões</Option>
                <Option value={1} sx={{ fontSize: '14px' }} color='warning'>Processos</Option>
                <Option value={2} sx={{ fontSize: '14px' }} color='success'>Avisos</Option>
              </Select>
              <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                Reuniões: {diass.length}
              </Typography>
            </Box>
          </Box>
        </LocalizationProvider>
        <Box
          sx={{
            position: 'relative',
            flexGrow: 1,
            mx: 2,
            borderRadius: '12px',
            bgcolor: tipoData === 3 || reuniao.length == 0 ? 'background.level3' : `${colors[tipoData]}.500`,
            maxWidth: '900px',
          }}
        >
          <Tabs
            size="lg"
            aria-label="Bottom Navigation"
            value={tipoData}
            onChange={(event, value) => { setTipoData(value as number) }}
            sx={(theme) => ({
              p: 1,
              borderRadius: 16,
              maxWidth: 400,
              mx: 'auto',
              mt: 2,

              boxShadow: tipoData == 3 ? 'background.level3' : theme.shadow.sm,
              '--joy-shadowChannel': theme.vars.palette[colors[tipoData]].darkChannel,
              [`& .${tabClasses.root}`]: {
                py: 1,
                flex: 1,
                fontWeight: 'md',
                fontSize: 'md',
                [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                  opacity: 0.7,
                },
              },
            })}
          >
            <TabList
              variant="plain"
              size="sm"
              disableUnderline
              sx={{ borderRadius: 'lg', p: 0, gap: 2 }}
            >

              <Tab
                disableIndicator
                orientation="vertical"
                variant='soft'
                color='primary'
                disabled={tipoData == 2 || tipoData == 1 ? true : false}
              >
                <ListDecoration valor={tipoData == 0 ? dados.length : 0} tipo={1} />
                Reuniões
              </Tab>
              <Tab
                disableIndicator
                orientation="vertical"
                variant='soft'
                color='warning'
                disabled={tipoData == 2 || tipoData == 0 ? true : false}
              >
                <ListDecoration valor={tipoData == 1 ? dados.length : 0} tipo={0} />
                Processos
              </Tab>
              <Tab
                disableIndicator
                orientation="vertical"
                variant='soft'
                {...(tipoData === 2 && { color: colors[2] })}
                disabled={tipoData == 0 || tipoData == 1 ? true : false}
              >
                <ListDecoration valor={tipoData == 2 ? dados.length : 0} tipo={2} />
                Avisos
              </Tab>
            </TabList>
          </Tabs>
          <Chip sx={{ position: 'absolute', top: 20, left: 15, fontSize: '20px', px: 3, bg: 'primary' }}>
            {
              dataCard
            }
          </Chip>
          {tipoData == 2 ?
            <IconButton sx={{ position: 'absolute', top: 20, right: 15, py: 0.5, fontSize: '40px', bg: 'primary' }} color='success' onClick={() => setOpenNotf(true)}>
              <AddAlertIcon sx={{ fontSize: '35px' }} />
            </IconButton>
            : null
          }
          <Modal open={openNotf} onClose={() => setOpenNotf(false)}>
            <ModalDialog>
              <DialogTitle>Create new project</DialogTitle>
              <DialogContent>Fill in the information of the project.</DialogContent>
              <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  setOpenNotf(false);
                }}
              >
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Titulo</FormLabel>
                    <Input autoFocus required value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Descrição</FormLabel>
                    <Textarea required minRows={5} value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Data</FormLabel>
                    <Input type='date' required value={dataAviso.toISOString().split('T')[0]} onChange={(e) => { setDataAviso(new Date(e.target.value)) }} />
                  </FormControl>
                  <Button onClick={() => { criarAvisos(); }}>Salvar</Button>
                </Stack>
              </form>
            </ModalDialog>
          </Modal>

          <Sheet sx={{ bgcolor: 'transparent', display: 'flex', flexDirection: 'column', height: '70%', alignItems: reuniao.length > 0 ? 'flex-start' : 'center' }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 2, sm: 8, md: 12 }}
              sx={{ flexGrow: 1 }}
            >
              {
                dados && dados.length > 0 ? dados.map((data: any) => (
                  tipoData != 2 ?
                  <Grid key={tipoData}>
                    <Card
                      variant="outlined"
                      orientation="horizontal"
                      sx={{
                        ml: 2,
                        mt: 2,
                        '&:hover': { boxShadow: 'md' },
                        boxShadow: 'sm',
                        maxHeight: '60px',
                        paddingTop: 1,
                      }}
                    >
                      <CircleIcon sx={{ width: '20px', color: 'var(--joy-palette-primary-plainColor)' }} />
                      <CardContent sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <Sheet>
                          <Typography level="title-lg" id="card-description" key={data.id}>
                            {tipoData === 0 ? data.inicial.sei ? data.inicial.sei : data.inicial.aprova_digital :
                              tipoData === 1 ? data.sei ? data.sei : data.aprova_digital : null}
                          </Typography>
                          <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                            {tipoData === 0 ? data.inicial.processo_fisico : tipoData === 1 ? data.processo_fisico : null}
                          </Typography>
                        </Sheet>
                        <Chip
                          component={Link}
                          underline='none'
                          href={'/inicial/detalhes/' + data.inicial_id}
                          variant="outlined"
                          color="primary"
                          size="sm"
                          sx={{ mt: 1, ml: 3 }}
                        >
                          Ir ao inicial
                        </Chip>
                        {tipoData === 0 ?
                          <Chip
                            component={Link}
                            underline='none'
                            onClick={() => { setOpen(true); setInicial(data.inicial.sei); }}
                            variant="outlined"
                            color="success"
                            size="sm"
                            sx={{ mt: 1 }}
                          >
                            Reagendar
                          </Chip>
                          : null}
                        <Modal open={open} onClose={() => setOpen(false)}>
                          <ModalDialog>
                            <DialogTitle>Reagendar Reunião</DialogTitle>
                            <DialogContent>{inicial}</DialogContent>
                            <form
                              onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                setOpen(false);
                              }}
                            >
                              <Stack spacing={2}>
                                <FormControl>
                                  <FormLabel>Data Reunião</FormLabel>
                                  <Chip color='primary' variant='soft' sx={{ fontSize: '19px', color: 'neutral.softActiveColor' }}>{dataCard}</Chip>
                                </FormControl>

                                <FormControl>
                                  <FormLabel>Nova data</FormLabel>
                                  <Input required type='date' value={dataRemarcacao.format('YYYY-MM-DD')} onChange={(e) => {
                                    setDataRemarcacao(dayjs(e.target.value));
                                  }} />
                                </FormControl>
                                <FormControl>
                                  <FormLabel>Motivo</FormLabel>
                                  <Textarea required minRows={2} maxRows={5} value={motivo} onChange={(e) => setMotivo(e.target.value)} />
                                </FormControl>
                                <Button onClick={() => reagendarReuniao(data.id)}>Alterar</Button>
                              </Stack>
                            </form>
                          </ModalDialog>
                        </Modal>
                      </CardContent>
                    </Card>
                  </Grid>
                  : <CardAviso titulo={data.titulo} descricao={data.descricao} id={data.id} key={data.id}/>
                )) :
                  <Grid key={tipoData}>
                    <Chip sx={{ fontSize: '18px', px: 3, mt: 4 }} color={colors[tipoData]} variant="plain" >
                      {
                        tipoData === 1 || tipoData === 0 ? 'SEM COMPROMISSOS' : 'SEM NOTIFICAÇÕES'
                      }
                    </Chip>
                  </Grid>
              }
            </Grid>
          </Sheet>
        </Box>
      </Box >
      <Tabs sx={{ borderRadius: 'lg', boxShadow: 'md', mt: 4, bgcolor: 'neutral.outlinedHoverBg' }}>
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
    </Content>
  );
}