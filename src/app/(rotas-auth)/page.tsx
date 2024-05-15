'use client'

import Content from '@/components/Content';
import * as React from 'react';
import { Button, Chip, ChipPropsColorOverrides, ColorPaletteProp, IconButton, Tab, TabList, TabPanel, Table, Tabs, tabClasses } from '@mui/joy';
import { TablePagination } from '@mui/material';
import * as inicialServices from '@/shared/services/inicial.services';
import { IInicial, IPaginatedInicial } from '@/shared/services/inicial.services';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Add } from '@mui/icons-material';
import { OverridableStringUnion } from '@mui/types';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import * as reunioes from '@/shared/services/reunioes.services';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import ListDecoration from '../../components/ListDecoration';
import Icon from '@mui/material/Icon';;
import { Card, CardContent, Grid, Option, Select, Sheet, Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import CircleIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import Link from '@mui/joy/Link';

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
  const [index, setIndex] = useState(3);
  const colors = ['primary', 'warning', 'success', 'success'] as const;
  const [reuniao, setReuniao] = useState([]);
  const [tipoData, setTipoData] = useState(0);
  const router = useRouter();

  const busca = (mes: any) => {
    reunioes.buscarPorMesAno(mes.toString(), data.year().toString())
      .then((response) => {
        if (Array.isArray(response)) {
          const diasArray = response
            .map((meeting: any) => {
              if (meeting.data_reuniao) {
                const dia = parseInt(meeting.data_reuniao.split('T')[0].split('-')[2]);
                return dia;
              }
              return null;
            })
            .filter((dia: any): dia is number => dia !== null);
          setDias(diasArray);
        } else {
          setDias([]);
        }
      })
      .catch((error) => {
        console.error("erro:", error);
      });
  };



  const fakeFetch = (date: Dayjs, { signal }: { signal: AbortSignal }) => {
    return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
      const daysToHighlight = [0];
      resolve({ daysToHighlight });

      signal.onabort = () => {
        reject(new DOMException('aborted', 'AbortError'));
      };
    });
  };

  const ServerDay = (props: PickersDayProps<Dayjs> & { highlightedDays?: number[], projetosDay?: number[] }) => {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? <Icon component={CircleIcon} sx={{ width: 13, height: 13, fontWeight: 'bold', mr: 1, color: tipoData == 0 ? 'var(--joy-palette-warning-plainColor)' : 'var(--joy-palette-primary-plainColor)' }} /> : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  };


  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fakeFetch(date, { signal: controller.signal })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          throw error;
        }
      });
    requestAbortController.current = controller;
  };

  const buscar_data = () => {
    if (tipoData == 1) {
      reunioes.buscarPorData(data.year() + '-' + ((data.month() + 1).toString().length == 1 ? '0' + (data.month() + 1) : data.month() + 1) + '-' + (data.date().toString().length == 1 ? '0' + data.date() : data.date().toString()))
        .then((response) => {
          setReuniao(response);
          if (reuniao.length > 0) {
            setIndex(0);
          } else {
            setIndex(3);
          }
        });
    } else if (tipoData == 0) {
      reunioes.buscarPorData(data.year() + '-' + ((data.month() + 1).toString().length == 1 ? '0' + (data.month() + 1) : data.month() + 1) + '-' + (data.date().toString().length == 1 ? '0' + data.date() : data.date().toString()))
        .then((response) => {
          setReuniao(response);
          if (reuniao.length > 0) {
            setIndex(1);
          } else {
            setIndex(3);
          }
        });
    }

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
    fetchHighlightedDays(initialValue);
    busca(data.month() + 1);
    var datacard = data.year() + '-' + (data.month() + 1) + '-' + data.date();
    setDataCard(new Date(datacard).toLocaleDateString('pt-BR'));
    buscar_data();
  }, [pagina, limite, data, index, reuniao.length, dataCard]);

  return (
    <Content
      titulo='Página Inicial'
      pagina='/'
    >

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              slotProps={{
                day: {
                  highlightedDays: diass
                } as any,
              }}
            />
            <Box sx={{ position: 'absolute', right: 18, bottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'end', gap: 2, justifyContent: 'center' }}>
              <Select value={tipoData} onChange={(_, v) => { setTipoData(v ? v : 0); setIndex(tipoData); buscar_data(); }} sx={{ minHeight: 20, fontSize: '14px', mb: 0.5 }} color={tipoData == 0 ? 'warning' : 'primary'}>
                <Option value={0} sx={{ fontSize: '14px' }} color='warning'>Processos</Option>
                <Option value={1} sx={{ fontSize: '14px' }} color='primary'>Reuniões</Option>
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
            transition: '0.2s',
            bgcolor: index === 3 || reuniao.length == 0 ? 'background.level3' : `${colors[index]}.500`,
            maxWidth: '900px',
          }}
        >
          <Tabs
            size="lg"
            aria-label="Bottom Navigation"
            value={index}
            onChange={(event, value) => { setIndex(value as number) }}
            sx={(theme) => ({
              p: 1,
              borderRadius: 16,
              maxWidth: 200,
              mx: 'auto',
              mt: 2,

              boxShadow: index == 3 ? 'background.level3' : theme.shadow.sm,
              '--joy-shadowChannel': theme.vars.palette[colors[index]].darkChannel,
              [`& .${tabClasses.root}`]: {
                py: 1,
                flex: 1,
                transition: '0.3s',
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
              sx={{ borderRadius: 'lg', p: 0 }}
            >

              <Tab
                disableIndicator
                orientation="vertical"
                {...(index === 0 && { color: colors[0] })}
                {...(tipoData == 0 && { 'disabled': true })}
              >
                <ListDecoration valor={tipoData == 1 ? reuniao.length : 0} tipo={1} />
                Reuniões
              </Tab>
              <Tab
                disableIndicator
                orientation="vertical"
                {...(index === 1 && { color: colors[1] })}
                sx={{ ml: 2 }}
                {...(tipoData == 1 && { 'disabled': true })}
              >
                <ListDecoration valor={tipoData == 0 ? reuniao.length : 0} tipo={2} />
                Processos
              </Tab>
            </TabList>
          </Tabs>
          <Chip sx={{ position: 'absolute', top: 20, left: 15, fontSize: '20px', px: 3, bg: 'primary' }}>
            {
              dataCard
            }
          </Chip>
          <Sheet sx={{ bgcolor: 'transparent', display: 'flex', flexDirection: 'column', height: '70%', alignItems: reuniao.length > 0 ? 'flex-start' : 'center' }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 2, sm: 8, md: 12 }}
              sx={{ flexGrow: 1 }}
            >
              {reuniao && reuniao.length > 0 ? reuniao.map((reuniao: any) => (
                index === 0 ?
                  <Grid key={index}>
                    <Card
                      variant="outlined"
                      orientation="horizontal"
                      sx={{
                        ml: 2,
                        mt: 2,
                        transition: '0s',
                        '&:hover': { boxShadow: 'md' },
                        boxShadow: 'sm',
                        maxHeight: '60px',
                        paddingTop: 1,
                      }}
                    >
                      <CircleIcon sx={{ width: '20px', color: 'var(--joy-palette-primary-plainColor)' }} />
                      <CardContent sx={{ display: 'flex', flexDirection: 'row', gap: 6 }}>
                        <Sheet>
                          <Typography level="title-lg" id="card-description" key={reuniao.id}>
                            {reuniao.inicial.sei ? reuniao.inicial.sei : reuniao.inicial.aprova_digital}
                          </Typography>
                          <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                            {reuniao.inicial.processo_fisico}
                          </Typography>
                        </Sheet>
                        <Chip
                          component={Link}
                          underline='none'
                          href={'/inicial/detalhes/' + reuniao.inicial_id}
                          variant="outlined"
                          color="primary"
                          size="sm"
                          sx={{ mt: 1 }}
                        >
                          Clique para ir ao inicial
                        </Chip>
                      </CardContent>
                    </Card>
                  </Grid>
                  :
                  <Grid key={index}>
                    <Card
                      variant="outlined"
                      orientation="horizontal"
                      sx={{
                        ml: 2,
                        mt: 2,
                        transition: '0s',
                        '&:hover': { boxShadow: 'md' },
                        boxShadow: 'sm',
                        maxHeight: '60px',
                        paddingTop: 1,
                      }}
                    >
                      <CircleIcon sx={{ width: '20px', color: 'var(--joy-palette-warning-plainColor)' }} />
                      <CardContent sx={{ display: 'flex', flexDirection: 'row', gap: 6 }}>
                        <Sheet>
                          <Typography level="title-lg" id="card-description" key={reuniao.id}>
                            {reuniao.inicial.sei ? reuniao.inicial.sei : reuniao.inicial.aprova_digital}
                          </Typography>
                          <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                            {reuniao.inicial.processo_fisico}
                          </Typography>
                        </Sheet>
                        <Chip
                          component={Link}
                          underline='none'
                          href={'/inicial/detalhes/' + reuniao.inicial_id}
                          variant="outlined"
                          color="warning"
                          size="sm"
                          sx={{ mt: 1 }}
                        >
                          Clique para ir ao inicial
                        </Chip>
                      </CardContent>
                    </Card>
                  </Grid>
              )) :
                <Grid key={index}>
                  <Chip sx={{ fontSize: '18px', px: 3, mt: 4 }} color="primary" variant="plain" >
                    SEM COMPROMISSOS
                  </Chip>
                </Grid>}
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