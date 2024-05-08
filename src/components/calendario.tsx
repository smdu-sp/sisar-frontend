'use client';

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar, DateCalendarProps } from '@mui/x-date-pickers/DateCalendar';
import * as reunioes from '@/shared/services/reunioes.services';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useState, useRef, useEffect } from 'react';
import ListDecoration from './ListDecoration';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Icon from '@mui/material/Icon';;
import { AspectRatio, Card, CardContent, Chip, Grid, IconButton, Sheet, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Box from '@mui/joy/Box';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
// import CircleIcon from '@mui/icons-material/Circle';
import CircleIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import Circles from './Circles';
import { ClassNames } from '@emotion/react';
import { Add } from '@mui/icons-material';
import Link from '@mui/joy/Link';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
interface Theme {
  vars: {
    palette: {
      primary: {
        mainChannel: string;
      };
    };
  };
}



export default function calendario() {

  const today = new Date();
  const [data, setData] = useState(dayjs(today.toLocaleDateString('pt-BR').split('/').reverse().join('-')));
  const [dataCard, setDataCard] = useState('');
  const [diass, setDias] = useState<number[]>([]);
  const initialValue = dayjs(today.toLocaleDateString('pt-BR').split('/').reverse().join('-'));
  const [index, setIndex] = useState(3);
  const colors = ['primary', 'warning', 'success', 'success'] as const;
  const [tipoLista, setTipoLista] = useState(0);
  const [reuniao, setReuniao] = useState([]);


  const busca = (mes: any) => {
    reunioes.buscarPorMesAno(mes.toString(), data.year().toString())
      .then((response) => {
        if (Array.isArray(response)) {
          const diasArray = response
            .map((meeting: any) => {
              if (meeting.data_reuniao) {
                // const dia = parseInt(meeting.data_reuniao.split('T')[0].split('-')[2] + '0001');
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

  const ServerDay = (props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) => {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? <Icon component={CircleIcon} sx={{ width: 13, height: 13, fontWeight: 'bold', mr: 1, color: 'var(--joy-palette-primary-plainColor)' }} /> : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  };

  const requestAbortController = useRef<AbortController | null>(null);
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
    reunioes.buscarPorData(data.year() + '-' + ((data.month() + 1).toString().length == 1 ? '0' + (data.month() + 1) : data.month() + 1) + '-' + (data.date().toString().length == 1 ? '0' + data.date() : data.date().toString()))
      .then((response) => {
        setReuniao(response);
        if (reuniao.length == 0) {
          setIndex(3);
        } else {
          setIndex(0);
        }
      });
  }

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    busca(data.month() + 1);
    var datacard = data.year() + '-' + (data.month() + 1) + '-' + data.date();
    datacard = new Date(datacard).toLocaleDateString('pt-BR');
    setDataCard(datacard);
    buscar_data();
  }, [data, index, reuniao.length, dataCard]);




  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              onChange={() => setTipoLista(1)}
            >
              <ListDecoration valor={diass.length} tipo={1} />
              Reuniões
            </Tab>
            <Tab
              disableIndicator
              orientation="vertical"
              {...(index === 1 && { color: colors[1] })}
              sx={{ ml: 2 }}
              onChange={() => setTipoLista(2)}
            >
              <ListDecoration valor={0} tipo={2} />
              Processos
            </Tab>
          </TabList>
        </Tabs>
        <Chip sx={{ position: 'absolute', top: 20, left: 15, fontSize: '20px', px: 3, bg: 'primary' }}>
          {
            dataCard
          }
        </Chip>
        <Sheet sx={{ bgcolor: 'transparent', display: 'flex', flexDirection: 'column', height: '70%', alignItems: 'start' }}>
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
                : ""
            )) : ""}
          </Grid>
        </Sheet>
      </Box>

    </Box >
  );
}
