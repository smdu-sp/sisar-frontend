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
import { useEffect, useState } from 'react';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Icon from '@mui/material/Icon';;
import { Grid, Sheet } from '@mui/joy';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Box from '@mui/joy/Box';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { ClassNames } from '@emotion/react';

export default function calendario() {
  const today = new Date();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState(dayjs(today.toLocaleDateString('pt-BR').split('/').reverse().join('-')));
  const [tipoData, setTipoData] = useState('');
  const [diass, setDias] = useState<number[]>([]);
  const initialValue = dayjs(today.toLocaleDateString('pt-BR').split('/').reverse().join('-'));
  const [index, setIndex] = useState(3);
  const colors = ['primary', 'warning', 'success', 'danger'] as const;
  const [tipoLista, setTipoLista] = useState(0);


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
          const diassString = diasArray.join(',');
          router.push(`?anos=${diassString}`);
        } else {
          setDias([0]);
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
        badgeContent={isSelected ? <Icon component={SupervisedUserCircleIcon} /> : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  };

  const tipo = () => {
    var dias = diass;
    for (let i = 0; i < dias.length; i++) {
      if (diass[i] === data.date()) {
        setTipoData('reuniao');
        return;
      }
    }
    setTipoData('');
  };

  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();

    fakeFetch(date, { signal: controller.signal })
      .then(({ daysToHighlight }) => {
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    tipo();
    busca(data.month() + 1);
    console.log(index);
  }, [data, index]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={initialValue}
          loading={isLoading}
          onMonthChange={(newDate) => {
            busca(newDate.month() + 1);
            setTipoData('');
          }}
          renderLoading={() => <DayCalendarSkeleton />}
          value={data}
          onChange={(newDate) => setData(newDate)}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays: diass,
            } as any,
          }}
        />
      </LocalizationProvider>



      
      <Box
        sx={{
          flexGrow: 1,
          mx: 2,
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          bgcolor: `${colors[index]}.500`,
          maxWidth: '900px',
        }}
      >
        <Tabs
          size="lg"
          aria-label="Bottom Navigation"
          value={index}
          onChange={(event, value) => setIndex(value as number)}
          sx={(theme) => ({
            p: 1,
            borderRadius: 16,
            maxWidth: 200,
            mx: 'auto',
            mt: 2,
            boxShadow: theme.shadow.sm,
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
              <ListItemDecorator>
                <PeopleAltIcon />
              </ListItemDecorator>
              Reuniões
            </Tab>
            <Tab
              disableIndicator
              orientation="vertical"
              {...(index === 1 && { color: colors[1] })}
              sx={{ ml: 2 }}
              onChange={() => setTipoLista(2)}
            >
              <ListItemDecorator>
                <PendingActionsIcon />
              </ListItemDecorator>
              Processos
            </Tab>
          </TabList>
        </Tabs>
        <Sheet sx={{ width: '100%', height: '70%', backgroundColor: 'danger.outlinedDisabledBorder', my: 2 }}>

        </Sheet>
      </Box>
    </Box>
  );
}
