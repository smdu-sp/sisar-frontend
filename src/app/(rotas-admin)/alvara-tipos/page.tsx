'use client'

import Content from '@/components/Content';
import { useCallback, useEffect, useState } from 'react';
import { Box, Button, ChipPropsColorOverrides, ColorPaletteProp, FormControl, FormLabel, IconButton, Input, Snackbar, Stack, Table, Tooltip, Typography } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as alvaraTipoService from '@/shared/services/alvara-tipo.services';
import { IPaginadoAlvaraTipo, IAlvaraTipo } from '@/shared/services/alvara-tipo.services';
import { TablePagination } from '@mui/material';
import { Add, Cancel, Check, Clear, Refresh, Search } from '@mui/icons-material';
import { OverridableStringUnion } from '@mui/types';

export default function AlvaraTipos() {
  const confirmaVazio: {
    aberto: boolean,
    confirmaOperacao: () => void,
    titulo: string,
    pergunta: string,
    color: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides>
  } = {
    aberto: false,
    confirmaOperacao: () => {},
    titulo: '',
    pergunta: '',
    color: 'primary'
  }

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [alvaraTipos, setAlvaraTipos] = useState<IAlvaraTipo[]>([]);
  const [pagina, setPagina] = useState(searchParams.get('pagina') ? Number(searchParams.get('pagina')) : 1);
  const [limite, setLimite] = useState(searchParams.get('limite') ? Number(searchParams.get('limite')) : 10);
  const [total, setTotal] = useState(searchParams.get('total') ? Number(searchParams.get('total')) : 1);
  const [busca, setBusca] = useState('');
  const [confirma, setConfirma] = useState(confirmaVazio);

  useEffect(() => {
    buscaDados();
  }, [ pagina, limite ]);
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString();
    },
    [searchParams]
  );

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

  function buscaDados(): void {
    alvaraTipoService.buscarTudo(pagina, limite)
      .then((response: IPaginadoAlvaraTipo) => {
        setTotal(response.total);
        setPagina(response.pagina);
        setLimite(response.limite);
        setAlvaraTipos(response.data);
      });
  }

  function limpaFitros(): void {
  }

  function confirmaDesativaAlvaraTipo(id: string): void {
  }

  function confirmaAtivaAlvaraTipo(id: string): void {
  }

  return (
    <Content 
      titulo='Tipos de alvará'
      pagina='alvara-tipos'
      breadcrumbs={[{
        label: 'Tipos de alvará',
        href: 'alvara-tipos'
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
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
          alignItems: 'end',
        }}
      >
        <IconButton size='sm' onClick={buscaDados}><Refresh /></IconButton>
        <IconButton size='sm' onClick={limpaFitros}><Clear /></IconButton>
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Buscar: </FormLabel>
          <Input
            startDecorator={<Search fontSize='small' />}
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                router.push(pathname + '?' + createQueryString('busca', busca));
                buscaDados();
              }
            }}
          />
        </FormControl>
      </Box>
      <Table hoverRow sx={{ tableLayout: 'auto' }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Admissibilidade</th>
            <th>1ª Análise SMUL</th>
            <th>2ª Análise SMUL</th>
            <th>1ª Análise Múltiplas</th>
            <th>2ª Análise Múltiplas</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {alvaraTipos && alvaraTipos.map((alvaraTipo) => (
            <tr key={alvaraTipo.id} style={{ cursor: 'pointer' }} onClick={() => router.push(`/alvara-tipos/detalhes/${alvaraTipo.id}`)}>
              <td>{alvaraTipo.nome}</td>
              <td>{alvaraTipo.prazo_admissibilidade}</td>
              <td>{alvaraTipo.prazo_analise_smul1}</td>
              <td>{alvaraTipo.prazo_analise_smul2}</td>
              <td>{alvaraTipo.prazo_analise_multi1}</td>
              <td>{alvaraTipo.prazo_analise_multi2}</td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  {!alvaraTipo.status ? (
                    <Tooltip title="Ativar tipo de alvará" arrow placement="top">
                      <IconButton size="sm" color="success" onClick={() => confirmaAtivaAlvaraTipo(alvaraTipo.id)}>
                        <Check />
                      </IconButton>
                    </Tooltip>                    
                  ) : (<Tooltip title="Desativar tipo de alvará" arrow placement="top">
                    <IconButton title="Desativar" size="sm" color="danger" onClick={() => confirmaDesativaAlvaraTipo(alvaraTipo.id)}>
                      <Cancel />
                    </IconButton>
                  </Tooltip>)}
                </div>
              </td>
            </tr>
          ))}
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
      <IconButton onClick={() => router.push('/alvara-tipos/detalhes/')} color='primary' variant='soft' size='lg' sx={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
      }}><Add /></IconButton>
    </Content>
  );
}