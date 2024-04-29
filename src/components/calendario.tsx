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



/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
    var dias = [
      26,
      27,
      28,
      29,
      10,
    ]
    const today = new Date();
    const daysToHighlight = dias;

    resolve({ daysToHighlight });

    signal.onabort = () => {
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}
const today = new Date();

var data = today.toLocaleDateString('pt-BR').split('/').reverse().join('-');

const initialValue = dayjs(data);

function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

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
}

export default function Home() {

  const [data, setData] = useState(initialValue);
  const [tipoData, setTipoData] = useState('');
  const [mes, setMes] = useState(0);
  const [ano, setAno] = useState(0);

  useEffect(() => {
    tipo();
    setMes(data.month() + 1);
    setAno(data.year());
    busca();
  }, []);
  var dias = [
    26,
    27,
    28,
    29,
    10
  ]

  const tipo = () => {
    for (let i = 0; i < dias.length; i++) {
      if (dias[i] === data.date()) {
        setTipoData('reuniao');
        return;
      }
    }
    setTipoData('');

  }
  
  const busca = () => {
    reunioes.buscarPorMesAno(mes.toString(), ano.toString()).then((response) => {
        console.log(response);
    })
  }
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1]);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
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

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    return () => requestAbortController.current?.abort();
  }, []);

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
              <SupervisedUserCircleIcon sx={{ fontSize: '4rem' }}/>
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