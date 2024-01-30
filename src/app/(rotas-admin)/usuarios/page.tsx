'use client'

import Content from '@/components/Content';
import { useCallback, useContext, useEffect, useState } from 'react';
import * as usuarioServices from '@/shared/services/usuario.services';
import { Box, Button, Chip, FormControl, FormLabel, IconButton, Input, Option, Select, Snackbar, Stack, Table, Tooltip, Typography, useTheme } from '@mui/joy';
import { Cancel, Check, Edit, Search, Warning } from '@mui/icons-material';
import { IPaginadoUsuario, IUsuario } from '@/shared/services/usuario.services';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AlertsContext } from '@/providers/alertsProvider';
import { TablePagination } from '@mui/material';

export default function Usuarios() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [pagina, setPagina] = useState(searchParams.get('pagina') ? Number(searchParams.get('pagina')) : 1);
  const [limite, setLimite] = useState(searchParams.get('limite') ? Number(searchParams.get('limite')) : 1);
  const [total, setTotal] = useState(searchParams.get('total') ? Number(searchParams.get('total')) : 1);
  const [status, setStatus] = useState(searchParams.get('status') ? Number(searchParams.get('status')) : 1);
  const [busca, setBusca] = useState(searchParams.get('busca') || '');
  const [confirmation, setConfirmation] = useState({ open: false, id: '' });
  const { setAlert } = useContext(AlertsContext);

  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    buscaUsuarios();
  }, [ status, pagina, limite ]);
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString();
    },
    [searchParams]
  );

  const buscaUsuarios = async () => {
    usuarioServices.buscarTudo(status, pagina, limite, busca)
      .then((response: IPaginadoUsuario) => {
        setTotal(response.total);
        setPagina(response.pagina);
        setLimite(response.limite);
        setUsuarios(response.data);
      });    
  }
  
  const autorizaUsuario = async (id: string) => {
    var resposta = await usuarioServices.autorizar(id);
    if (resposta && resposta.autorizado){
      setAlert('Usuário autorizado!', 'Esse usuário foi autorizado e já pode acessar o sistema.', 'success', 3000, Check);
      buscaUsuarios();
    } else {
      setAlert('Tente novamente!', 'Não foi possível autorizar o usuário.', 'warning', 3000, Warning);
    }
  }

  const mudaPagina = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    novaPagina: number,
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

  const permissoes = {
    'DEV': { label: 'Desenvolvedor', value: 'DEV', color: 'primary' },
    'SUP': { label: 'Superusuario', value: 'SUP', color: 'info' },
    'ADM': { label: 'Administrador', value: 'ADM', color: 'success' },
    'USR': { label: 'Usuário', value: 'USR', color: 'warning' },
  }
  const cargos = {
    'ADM': { label: 'Administrativo', value: 'ADM', color: 'success' },
    'TEC': { label: 'Técnico', value: 'TEC', color: 'warning' },
  }
  return (
    <Content
      breadcrumbs={[
        { label: 'Usuários', href: '/usuarios' }
      ]}
      titulo='Usuários'
      pagina='/usuarios'
    >
      <Snackbar
        variant="solid"
        color="primary"
        size="lg"
        invertedColors
        open={confirmation.open}
        onClose={() => setConfirmation({ ...confirmation, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ maxWidth: 360 }}
      >
        <div>
          <Typography level="title-lg">Autorizar usuário.</Typography>
          <Typography sx={{ mt: 1, mb: 2 }} level="title-md">Tem certeza de que deseja autorizar esse usuário?</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="solid" color="primary" onClick={() => {
              autorizaUsuario(confirmation.id);
              setConfirmation({ ...confirmation, open: false });
            }}>
              Sim
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setConfirmation({ ...confirmation, open: false })}
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
        }}
      >
        <FormControl size="sm">
          <FormLabel>Status: </FormLabel>
          <Select
            size="sm"
            value={status}
            onChange={(event, newValue) => {
              router.push(pathname + '?' + createQueryString('status', String(newValue! || 1)));
              setStatus(newValue! || 1);
            }}
          >
            <Option value={1}>Ativos</Option>
            <Option value={2}>Inativos</Option>
            <Option value={3}>Esperando autorização</Option>
            <Option value={4}>Todos</Option>
          </Select>
        </FormControl>
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Buscar: </FormLabel>
          <Input
            startDecorator={<Search fontSize='small' />}
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                router.push(pathname + '?' + createQueryString('busca', busca));
                buscaUsuarios();
              }
            }}
          />
        </FormControl>
      </Box>
      <Table hoverRow>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Usuário</th>
            <th></th>
            <th style={{ textAlign: 'right' }}></th>
          </tr>
        </thead>
        <tbody>
          {usuarios ? usuarios.map((usuario) => (
            <tr key={usuario.id} style={{ cursor: 'pointer', backgroundColor: usuario.status === 3 ? theme.vars.palette.warning.plainActiveBg : undefined }}>
              <td>{usuario.nome}</td>
              <td>{usuario.login}</td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Chip color={cargos[usuario.cargo].color} size='sm'>{cargos[usuario.cargo].label}</Chip>            
                  <Chip color={permissoes[usuario.permissao].color} size='sm'>{permissoes[usuario.permissao].label}</Chip>
                </div>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  {usuario.status === 3 && (
                    <Tooltip title="Aprovar usuário novo" arrow placement="top">
                      <IconButton size="sm" color="success" onClick={() => setConfirmation({ open: true, id: usuario.id })}>
                        <Check />
                      </IconButton>
                    </Tooltip>                    
                  )}
                  <Tooltip title="Detalhes" arrow placement="top">
                    <IconButton component="a" href={`/usuarios/detalhes/${usuario.id}`} size="sm" color="warning">
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Desativar" arrow placement="top">
                    <IconButton title="Desativar" size="sm" color="danger">
                      <Cancel />
                    </IconButton>
                  </Tooltip>
                </div>
              </td>
            </tr>
          )) : <tr><td colSpan={4}>Nenhum usuário encontrado</td></tr>}
        </tbody>
      </Table>
      {total > 0 && <TablePagination
        component="div"
        count={total}
        page={(pagina - 1)}
        onPageChange={mudaPagina}
        rowsPerPage={limite}
        onRowsPerPageChange={mudaLimite}
        rowsPerPageOptions={[10, 25, 50, 100]}
        labelRowsPerPage="Linhas por página"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
      />}
    </Content>
  );
}