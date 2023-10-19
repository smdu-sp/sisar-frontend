'use client'

import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Content from '@/components/Content';
import { Box, Chip, ColorPaletteProp, FormControl, FormLabel, Input, Select, IconButton, Option, Button } from '@mui/joy';
import { AutorenewRounded, Block, CheckRounded, KeyboardArrowLeft, KeyboardArrowRight, Search } from '@mui/icons-material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { IInicial, IPaginatedInicial, IniciaisService } from '@/shared/services/inicial';


export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const rootUrl = '/iniciais';
  const [totalCount, setTotalCount] = useState<number>(0);
  const [rows, setRows] = useState<IInicial[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const page = useMemo(() => {
    return Number(searchParams.get('page')) || 1;
  }, [searchParams])

  const limit = useMemo(() => {
    return Number(searchParams.get('limit')) || 10;
  }, [searchParams])

  const clearAllParams = () => {
    var params = new URLSearchParams(searchParams);
    router.push(pathname);
  }

  const handleChangePage = (event: unknown, newPage: number | null) => {
    var params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleLimitChange = (event: unknown, newLimit: number | null) => {
    var params = new URLSearchParams(searchParams);
    params.set('limit', String(newLimit));
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    IniciaisService.findAll(page, limit).then((result: IPaginatedInicial | Error) => {
      setLoading(false);
      if (result) {
          if (result instanceof Error){
            alert(result.message);
          } else {
            result = result as IPaginatedInicial;
            console.log(result);
            setRows(result.data);
            setTotalCount(result.totalCount);
          }
      }
    });
  }, [ searchParams, limit, page ])
  
  return (
    <Content
      breadcrumbs={[]}
      titulo='Home'
      pagina='/'
    >
    <a href="/inicial/detalhes">
      <Button
        variant="solid"
        size='lg'
        sx={{
          position: 'absolute',
          bottom: 50,
          right: 50,
        }}
      >
        Novo
      </Button>
    </a>
    <Box
      className="SearchAndFilters-tabletUp"
      sx={{
        borderRadius: 'sm',
        py: 2,
        display: {
          xs: 'none',
          sm: 'flex',
        },
        flexWrap: 'wrap',
        gap: 1.5,
        '& > *': {
          minWidth: {
            xs: '120px',
            md: '160px',
          },
        },
      }}
    >
      <FormControl sx={{ flex: 1 }} size="sm">
        <Input placeholder="SEI/SQL" startDecorator={<Search />} />
      </FormControl>
    </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          overflowX: 'hidden',
          minHeight: 0,
          '&::-webkit-scrollbar': {
            width: '0.5em',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--joy-palette-background-level1)',
            borderRadius: '10px',
          }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          stickyFooter
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: '8px' }}>Controle Interno</th>
              <th style={{ padding: '8px' }}>SEI</th>
              <th style={{ padding: '8px' }}>Data Protocolo</th>
              <th style={{ padding: '8px' }}>Etapa</th>
              <th style={{ padding: '8px' }}>Data Limite</th>
              <th style={{ padding: '8px' }}>Dias restantes</th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row: any) => (
              <tr key={row.id}>
                <td>
                  <Typography level="body-xs">{row.id}</Typography>
                </td>
                <td>
                  <a href={`/inicial/detalhes/${row.id}`}><Typography level="body-xs">{row.sei}</Typography></a>
                </td>
                <td>
                  <Typography level="body-xs">{row.data_protocolo}</Typography>
                </td>
                <td>
                  {row.status}
                </td>
                <td>
                  <Typography level="body-xs"></Typography>
                </td>
                <td>
                  <Typography level="body-xs"></Typography>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    justifyContent: 'space-between',
                    p: 1,
                  }}
                >
                  {totalCount > 0 ? <>
                  <FormControl orientation="horizontal" size="sm" sx={{ alignItems: 'center', gap: 2, }}>
                    <Select value={limit} onChange={(event, number) => handleLimitChange(event, number)}>
                      <Option value={5}>5</Option>
                      <Option value={10}>10</Option>
                      <Option value={25}>25</Option>
                    </Select>
                    <Typography>
                      Linhas por página
                    </Typography>
                  </FormControl>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {page > 1 && 
                    <IconButton
                      size="sm"
                      color="neutral"
                      variant="outlined"
                      onClick={(event) => handleChangePage(event, page-1)}
                    >
                      <KeyboardArrowLeft />
                    </IconButton>}
                    <FormLabel>
                      {limit*(page-1)+1} - {(limit*page) <= totalCount ? limit*page : totalCount} de {totalCount} registro{totalCount > 1 && 's'}
                    </FormLabel>
                    {page < Math.ceil(totalCount/limit) &&
                    <IconButton
                      size="sm"
                      color="neutral"
                      variant="outlined"
                      onClick={(event) => handleChangePage(event, page+1)}
                    >
                      <KeyboardArrowRight />
                    </IconButton>}
                  </Box></> : <Typography>Nenhum registro encontrado</Typography>}
                </Box>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Sheet>
    </Content>
  );
}