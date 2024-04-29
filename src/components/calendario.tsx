'use client';

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import * as reunioes from '@/shared/services/reunioes.services';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useEffect, useState } from 'react';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Icon from '@mui/material/Icon';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { Sheet } from '@mui/joy';
import Router from 'next/router';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function calendario() {
  const today = new Date();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState(dayjs(today.toLocaleDateString('pt-BR').split('/').reverse().join('-')));
  const [tipoData, setTipoData] = useState('');
  const [mes, setMes] = useState(0);
  const [ano, setAno] = useState(0);
  const [diass, setDias] = useState<number[]>([]);
  const initialValue = dayjs(today.toLocaleDateString('pt-BR').split('/').reverse().join('-'));

  const busca = () => {
    setMes(data.month() + 1);
    setAno(data.year());

    let mes = data.month() + 1

    reunioes.buscarPorMesAno(mes.toString(), data.year().toString())
      .then((response) => {
        if (Array.isArray(response)) {
          const diasArray = response
            .map((meeting: any) => {
              if (meeting.data_reuniao) {
                const dia = parseInt(meeting.data_reuniao.split('T')[0].split('-')[2]);
                return dia;
              }
              return null; // Se não houver data de reunião, retornamos null
            })
            .filter((dia: any): dia is number => dia !== null);
          setDias(diasArray);
          const diassString = diasArray.join(',');
          router.push(`?anos=${diassString}`);
        } else {
          console.error("Response is not an array:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  };

  const fakeFetch = (date: Dayjs, { signal }: { signal: AbortSignal }) => {
    return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
      const d = searchParams.get('anos');
      const dias = d?.split(',');
      const daysToHighlight = [];
      if (dias) {
        for (let i = 0; i < dias.length; i++) {
            daysToHighlight.push(parseInt(dias[i]));
        }
    }
      resolve({ daysToHighlight });

      const newUrl = `${window.location.pathname}`;
      window.history.replaceState({}, '', newUrl);
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
  const [highlightedDays, setHighlightedDays] = React.useState([1]);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();

    fakeFetch(date, { signal: controller.signal })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
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
    setMes(data.month() + 1);
    setAno(data.year());
    fetchHighlightedDays(initialValue);
    console.log(data);
    tipo();
    busca();
  }, [data]);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <Sheet sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={initialValue}
          loading={isLoading}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          onChange={(newDate) => setData(newDate)}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            } as any,
          }}
        />
      </LocalizationProvider>
      <Card
        data-resizable
        sx={{
          textAlign: 'center',
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          width: '40%',
          overflow: 'auto',
          resize: 'horizontal',
          '--icon-size': '100px',
        }}
      >
        <CardOverflow variant="solid" sx={{ color: 'gray' }}>
          <AspectRatio
            variant="outlined"
            ratio="1"
            sx={{
              m: 'auto',
              transform: 'translateY(50%)',
              borderRadius: '50%',
              width: 'var(--icon-size)',
              boxShadow: 'sm',
              bgcolor: 'background.surface',
              position: 'relative',
            }}
          >
            <div>
              <SupervisedUserCircleIcon sx={{ fontSize: '4rem' }} />
            </div>
          </AspectRatio>
        </CardOverflow>
        <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
          {tipoData == 'reuniao' ? 'Hoje á reunião marcada!' : 'Sem Reunião nesta data'}
        </Typography>

        <CardActions
          orientation="vertical"
          buttonFlex={1}
          sx={{
            '--Button-radius': '40px',
            width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
          }}
        >
          <Button variant="solid" color="primary" disabled={tipoData != 'reuniao'} onClick={() => Router.push('inicial/detalhes/1')}>
            Inicial
          </Button>
        </CardActions>
      </Card>
    </Sheet>
  );
}
