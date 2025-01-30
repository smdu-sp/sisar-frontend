'use client'

import Content from '@/components/Content';
import CardAviso from '@/components/CardAviso';
import * as React from 'react';
import { Autocomplete, AutocompleteOption, Button, Chip, ChipPropsColorOverrides, ColorPaletteProp, DialogContent, DialogTitle, FormControl, FormHelperText, FormLabel, IconButton, Input, Modal, ModalDialog, Skeleton, Stack, Tab, TabList, TabPanel, Table, Tabs, Textarea, tabClasses } from '@mui/joy';
import { TablePagination } from '@mui/material';
import * as inicialServices from '@/shared/services/inicial/inicial.services';
import { IInicial, IPaginatedInicial } from '@/shared/services/inicial/inicial.services';
import { useCallback, useEffect, useState } from 'react';
import { IProcesso } from '@/types/reunioes/reunioes.dto';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Add, Check } from '@mui/icons-material';
import { OverridableStringUnion } from '@mui/types';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import * as reunioes from '@/shared/services/reunioes/reunioes.services';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import ListDecoration from '../../components/ListDecoration';
import Icon from '@mui/material/Icon';;
import { Card, CardContent, Grid, Option, Select, Sheet, Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import * as avisos from '@/shared/services/avisos/avisos.services'
import CircleIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import Link from '@mui/joy/Link';
import { AlertsContext } from '@/providers/alertsProvider';
import 'dayjs/locale/pt-br';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as comum from "@/shared/services/common/comum.services";
import { date, z } from 'zod';
import {
  infer as Infer,
  number,
  string,
} from "zod";
import Reuniao from '@/components/Reuniao';


const schemaAviso = z.object({
  titulo: string().min(1, { message: "O titulo deve ter pelo menos 1 letras" }),
  descricao: string(),
  dataAviso: date(),
  tipo: number(),
  idInicial: number()
});

type SchemaAviso = Infer<typeof schemaAviso>;

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
  const [dias, setDias] = useState<number[]>([]);
  const initialValue = dayjs(today.toLocaleDateString('pt-BR').split('/').reverse().join('-'));
  const colors = ['primary', 'warning', 'success', 'success'] as const;
  const [tipoData, setTipoData] = useState(0);
  const [open, setOpen] = React.useState<boolean>(false);
  const [openNotf, setOpenNotf] = React.useState<boolean>(false);
  const [inicial, setInicial] = useState('');
  const [dados, setDados] = useState<IProcesso[]>([]);
  const [descricao, setDescricao] = useState('');
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState(0);
  const [lemTab, setLemTab] = useState<boolean>(true);
  const [idInicial, setIdInicial] = useState(0);
  const [seiDados, setSei] = useState('');
  const [dataAviso, setDataAviso] = useState<Date>(new Date());
  const [carregando, setCarregando] = useState(true);
  const [processosAvisos, setProcessosAvisos] = useState<inicialServices.IProcessosAvisos[]>([]);
  const [processoCard, setProcessoCard] = useState(0);
  const router = useRouter();
  const [IdReuniao, setIdReuniao] = useState("");
  const { setAlert } = React.useContext(AlertsContext);
  const [dataProps, setDataProps] = useState(dayjs(today.toLocaleDateString('pt-BR').split('/').reverse().join('-')));
  const [modalProcessoNovo, setModalProcessoNovo] = useState(false);
  const [seiNovo, setSeiNovo] = useState('');
  const [processoExistente, setProcessoExistente] = useState<IInicial>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitted }
  } = useForm<SchemaAviso>({
    mode: "onChange",
    resolver: zodResolver(schemaAviso),
    values: {
      titulo,
      descricao,
      dataAviso,
      tipo,
      idInicial
    }
  });

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
    } else if (tipoData == 1) {
      inicialServices.buscarPorMesAno(mes.toString(), data.year().toString())
        .then((response) => {
          if (Array.isArray(response)) {
            for (let i = 0; i < response.length; i++) {
              setDias(prevDias => {
                return [...prevDias, parseInt(response[i].data_processo.toString().split("T")[0].split("-")[2])];
              });
            }
          } else {
            setDias([]);
          }
        })
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

  const buscar_data = () => {
    if (tipoData == 0) {
      reunioes.buscarPorData(data.year() + '-' + ((data.month() + 1).toString().length == 1 ? '0' + (data.month() + 1) : data.month() + 1) + '-' + (data.date().toString().length == 1 ? '0' + data.date() : data.date().toString()))
        .then((response) => {
          setDados(response);
        });
    } else if (tipoData == 1) {
      reunioes.buscarPorDataProcesso(data.year() + '-' + ((data.month() + 1).toString().length == 1 ? '0' + (data.month() + 1) : data.month() + 1) + '-' + (data.date().toString().length == 1 ? '0' + data.date() : data.date().toString()))
        .then((response: IProcesso[]) => {
          setDados(response);
        });
    } else if (tipoData == 2) {
      avisos.buscarDia(data.year() + '-' + ((data.month() + 1).toString().length == 1 ? '0' + (data.month() + 1) : data.month() + 1) + '-' + (data.date().toString().length == 1 ? '0' + data.date() : data.date().toString()))
        .then((response) => {
          setDados(response);
        });
    }
  }

  const onSubmit = (data: SchemaAviso) => {
    setCarregando(true);
    const criar = {
      titulo: data.titulo,
      descricao: data.descricao,
      data: data.dataAviso,
      inicial_id: data.idInicial,
      tipo: data.tipo
    }
    avisos.criar(criar)
      .then(() => {
        setAlert('Lembrete criado', 'Lembrete criado com sucesso!', 'success', 3000, Check);
        busca(dataAviso.getMonth() + 1);
        setDataAviso(dataAviso);
        setOpenNotf(false);
        reset();
        setCarregando(false);
      });
  }

  const atualizarAvisos = () => {
    busca(dataAviso.getMonth() + 1);
    buscar_data();
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString();
    },
    [searchParams]
  );

  const buscaIniciais = async () => {
    inicialServices.buscarTudo(pagina, limite, '', '-1' )
      .then((response: IPaginatedInicial) => {
        setTotal(response.total);
        setPagina(response.pagina);
        setLimite(response.limite);
        setIniciais(response.data);
      });
  }

  useEffect(() => {
    inicialServices.processosAvisos()
      .then((response: inicialServices.IProcessosAvisos[]) => {
        setProcessosAvisos(response);
      });
  }, []);

  const options = processosAvisos && processosAvisos.length > 0 && processosAvisos.map((processo) => ({
    label: processo.sei,
    value: parseInt(processo.id)
  }));

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

  useEffect(() => {
    buscaIniciais();
    busca(data.month() + 1);
  }, [pagina, limite, tipoData]);

  useEffect(() => {
    var datacard = data.year() + '-' + (data.month() + 1) + '-' + data.date();
    setDataCard(datacard.replaceAll("-", "/").split('/').reverse().join('/'));
    buscar_data();
    setCarregando(false);
  }, [data]);
  
  const checaSei = async (sei: string) => {
    inicialServices.verificaSei(sei).then((response: IInicial | null) => {
      if (response) {
        setProcessoExistente(response);
      }
    })
  }

  return (
    <Content
      titulo='Página Inicial'
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
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'end' }}>
            <DateCalendar
              defaultValue={initialValue}
              onMonthChange={(newDate) => {
                busca(newDate.month() + 1);
                setDataProps(newDate);
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
                  highlightedDays: dias,
                } as any,
              }}
            />
            <Box sx={{ position: 'absolute', right: 18, bottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'end', gap: 2, justifyContent: 'center' }}>
              <Select value={tipoData} onChange={(_, v) => { setTipoData(v ? v : 0); setDados([]); }} sx={{ minHeight: 20, minWidth: 120, fontSize: '14px', mb: 0.5 }} color={colors[tipoData]}>
                <Option value={0} sx={{ fontSize: '14px' }} color='primary'>Reuniões</Option>
                <Option value={1} sx={{ fontSize: '14px' }} color='warning'>Processos</Option>
                <Option value={2} sx={{ fontSize: '14px' }} color='success'>Lembretes</Option>
              </Select>
              <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                {tipoData == 0 ? 'Reuniões: ' : tipoData == 1 ? 'Processos: ' : 'Lembretes:'} {dias.length}
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
            bgcolor: 'background.level3',
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
                Lembretes
              </Tab>
            </TabList>
          </Tabs>
          <Chip sx={{ position: 'absolute', bottom: 10, left: 15, fontSize: '15px', px: 3, bg: 'primary' }}>
            {dataCard}
          </Chip>
          {tipoData == 2 ?
            <IconButton sx={{ position: 'absolute', top: 20, right: 15, py: 0.5, fontSize: '40px', bg: 'primary' }} color='success' onClick={() => { setOpenNotf(true); setLemTab(true) }}>
              <NotificationAddIcon sx={{ fontSize: '35px' }} />
            </IconButton>
            : null
          }
          <Sheet sx={{
            bgcolor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            height: '70%',
            p: 2,
          }}>
            <Sheet
              sx={{
                display: 'flex',
                flexDirection: tipoData != 2 ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: dados.length > 0 ? 'flex-start' : 'center',
                overflowX: 'auto',
                width: "100%",
                bgcolor: 'transparent',
                '&::-webkit-scrollbar': { height: 10, WebkitAppearance: 'none', maxWidth: "10px" },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: 8,
                  border: '1px solid',
                  backgroundColor: "neutral.plainColor"
                },
                minHeight: '300px',
              }}
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
                        <CircleIcon color={colors[tipoData]} sx={{ width: '20px' }} />
                        <CardContent sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                          <Sheet>
                            <Typography level="title-lg" id="card-description" key={data.id}>
                              {comum.formatarSei(data.inicial.sei)}
                            </Typography>
                            <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                              {comum.formatarFisico(data.inicial.processo_fisico)}
                            </Typography>
                          </Sheet>
                          <Chip
                            component={Link}
                            underline='none'
                            href={'/inicial/detalhes/' + data.inicial_id}
                            variant="outlined"
                            color={colors[tipoData]}
                            size="sm"
                            sx={{ mt: 1, ml: 3 }}
                          >
                            Ir ao inicial
                          </Chip>
                          {tipoData === 0 ?
                            <Chip
                              component={Link}
                              underline='none'
                              onClick={() => { setOpen(true); setInicial(data.inicial.sei); setIdReuniao(data.id) }}
                              variant="outlined"
                              color="success"
                              size="sm"
                              sx={{ mt: 1 }}
                            >
                              Reagendar
                            </Chip> : null
                          }
                        </CardContent>
                      </Card>
                    </Grid>
                    : <CardAviso titulo={data.titulo} descricao={data.descricao} id={data.id} key={data.id} processo={data.inicial.sei} func={atualizarAvisos} />
                )) :
                  <Grid key={tipoData}>
                    <Chip sx={{ fontSize: '18px', px: 3, mt: 4 }} color={colors[tipoData]} variant="plain" >
                      {
                        tipoData === 1 || tipoData === 0 ? 'SEM COMPROMISSOS' : 'SEM NOTIFICAÇÕES'
                      }
                    </Chip>
                  </Grid>
              }
            </Sheet>
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
                <th style={{ textAlign: 'right' }}></th>
              </tr>
            </thead>
            <tbody>
              {iniciais && iniciais.length > 0 ? iniciais.map((inicial: IInicial) => (
                <tr key={inicial.id} style={{ cursor: 'pointer' }}>
                  <td onClick={() => router.push(`/inicial/detalhes/${inicial.id}`)}>{inicial.id}</td>
                  <td onClick={() => router.push(`/inicial/detalhes/${inicial.id}`)}>
                    <Chip color={inicial.status > 1 ? status[0].color : status[inicial.status].color}>
                      {inicial.status > 2 ? status[0].label : status[inicial.status].label}
                    </Chip>
                  </td>
                  <td onClick={() => router.push(`/inicial/detalhes/${inicial.id}`)}>{comum.formatarSei(inicial.sei)}</td>
                  <td onClick={() => router.push(`/inicial/detalhes/${inicial.id}`)}>{inicial.tipo_requerimento}</td>
                  <td onClick={() => router.push(`/inicial/detalhes/${inicial.id}`)}>{inicial.requerimento}</td>
                  <td onClick={() => router.push(`/inicial/detalhes/${inicial.id}`)}>{new Date(inicial.data_protocolo).toLocaleDateString('pt-BR')}</td>
                  <td onClick={() => router.push(`/inicial/detalhes/${inicial.id}`)}>{inicial.alvara_tipo.nome}</td>
                  <td onClick={() => router.push(`/inicial/detalhes/${inicial.id}`)}>
                    <Chip color={processo[inicial.tipo_processo].color}>
                      {processo[inicial.tipo_processo].label}
                    </Chip>
                  </td>
                  <td>
                    <IconButton color='success' onClick={() => {
                      setLemTab(false); setOpenNotf(true); setIdInicial(inicial.id); setSei(inicial.sei);
                    }}>
                      <NotificationAddIcon sx={{ fontSize: '25px' }} />
                    </IconButton>
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

      <Reuniao
        buscar={busca}
        buscarData={buscar_data}
        data={dataCard}
        open={open}
        setOpen={setOpen}
        id={IdReuniao}
        dataProps={dataProps}
      />

      {/* Modal de Lembretes */}
      <Modal open={openNotf} onClose={() => setOpenNotf(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalDialog>
            <DialogTitle>Adicionar Lembrete</DialogTitle>
            <DialogContent>Preencha as informações do lembrete</DialogContent>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Titulo</FormLabel>
                {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                  name="titulo"
                  control={control}
                  defaultValue={titulo}
                  render={({ field: { ref, ...field } }) => {
                    return (<>
                      <Input
                        type="text"
                        placeholder="Titulo"
                        error={Boolean(errors.titulo)}
                        {...field}
                      />
                      {errors.titulo && <FormHelperText color="danger">
                        {errors.titulo?.message}
                      </FormHelperText>}
                    </>);
                  }}
                />}
              </FormControl>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                  name="descricao"
                  control={control}
                  defaultValue={descricao}
                  render={({ field: { ref, ...field } }) => {
                    return (<>
                      <Textarea
                        minRows={2}
                        placeholder="Descrição"
                        error={Boolean(errors.descricao)}
                        {...field}
                      />
                      {errors.descricao && <FormHelperText color="danger">
                        {errors.descricao?.message}
                      </FormHelperText>}
                    </>);
                  }}
                />}
              </FormControl>
              <FormControl>
                <FormLabel>Data</FormLabel>
                {/* <Input type='date' required value={dataAviso.toISOString().split('T')[0]} onChange={(e) => { setDataAviso(new Date(e.target.value)) }} /> */}
                {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                  name="dataAviso"
                  control={control}
                  defaultValue={new Date(dataAviso.toLocaleString().split('T')[0])}
                  render={({ field: { ref, ...field } }) => {
                    return (<>
                      <Input
                        type="date"
                        placeholder="Data Lembrete"
                        error={Boolean(errors.dataAviso)}
                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                        onChange={(event) => {
                          const newValue = new Date(event.target.value + 'T00:00:00Z');
                          field.onChange(newValue);
                        }}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                        name={field.name}
                      />
                      {errors.dataAviso && <FormHelperText color="danger">
                        {errors.dataAviso?.message}
                      </FormHelperText>}
                    </>);
                  }}
                />}
              </FormControl>
              <FormControl>
                <FormLabel>Tipo</FormLabel>
                {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                  name="tipo"
                  control={control}
                  defaultValue={tipo}
                  render={({ field: { ref, ...field } }) => {
                    return (<>
                      <Select
                        placeholder="Tipo"
                        {...field}
                        onChange={(_, value) => field.onChange(value)}
                      >
                        <Option value={0}>Geral</Option>
                        <Option value={1}>Pessoal</Option>
                      </Select>
                      {errors.tipo && <FormHelperText>
                        {errors.tipo?.message}
                      </FormHelperText>}
                    </>);
                  }}
                />}
              </FormControl>
              <FormControl>
                <FormLabel>Processos</FormLabel>
                {
                  lemTab ?
                    <Controller
                      name="idInicial"
                      control={control}
                      defaultValue={idInicial}
                      render={({ field }) => (
                        <>
                          <Autocomplete
                            options={processosAvisos && processosAvisos.length > 0 ? processosAvisos : []}
                            getOptionLabel={(option) => option.sei!}
                            renderOption={(props, option) => (
                              <AutocompleteOption {...props} key={option.id} value={option.id}>
                                {option.sei}
                              </AutocompleteOption>
                            )}
                            placeholder="Unidades"
                            filterOptions={(options, { inputValue }) =>
                              options.filter(
                                (option) =>
                                  option.sei?.toLowerCase().includes(inputValue.toLowerCase())
                              )
                            }
                            noOptionsText="Nenhuma Unidades encontrada"
                            onChange={(event, newValue) => {
                              field.onChange(newValue ? newValue.id : '');
                            }}
                            onBlur={field.onBlur}
                          />
                        </>
                      )}
                    />
                    :
                    <Input type='text' sx={{ color: 'grey' }} required readOnly value={seiDados} />
                }
              </FormControl>
              <FormControl sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', gap: 0.8 }}>
                <Button 
                  size='sm'
                  variant='plain' 
                  color='neutral' 
                  onClick={() => setOpenNotf(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  size="sm" 
                  variant="solid" 
                  color="primary" 
                  type="submit" 
                  loading={carregando} 
                  disabled={!isValid}
                  sx={{ borderRadius: 4 }}
                >
                  Salvar
                </Button>
              </FormControl>
            </Stack>
          </ModalDialog>
        </form>
      </Modal>
    </Content>
  );
}
