'use client'

import Content from '@/components/Content';
import { useCallback, useContext, useEffect, useState } from 'react';
import * as usuarioServices from '@/shared/services/usuario.services';
import { Button, Chip, FormControl, FormLabel, IconButton, Option, Select, Snackbar, Stack, Table, Tooltip, Typography, useTheme } from '@mui/joy';
import { Cancel, Check, Edit, Warning } from '@mui/icons-material';
import { IPaginadoUsuario, IUsuario } from '@/shared/services/usuario.services';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@/components/Pagination';
import { AlertsContext } from '@/providers/alertsProvider';

export default function Usuarios() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [pagina, setPagina] = useState(searchParams.get('pagina') || 1);
  const [limite, setLimite] = useState(searchParams.get('limite') || 1);
  const [total, setTotal] = useState(searchParams.get('total') || 1);
  const [status, setStatus] = useState(searchParams.get('status') || '1');
  const [confirmation, setConfirmation] = useState({ open: false, id: '' });
  const { setAlert } = useContext(AlertsContext);

  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    buscaUsuarios(status);
  }, [ status ]);
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  );

  const buscaUsuarios = async (status: string) => {
    usuarioServices.buscarTudo(status)
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
      buscaUsuarios(status);
    } else {
      setAlert('Tente novamente!', 'Não foi possível autorizar o usuário.', 'warning', 3000, Warning);
    }
  }

  const primeiraPagina = () => {
    router.push(pathname + '?' + createQueryString('status', '1'));
    setPagina(1);
  }

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
      <FormControl orientation="horizontal" sx={{ mb: 2, ml: 1 }}>
        <FormLabel>Status: </FormLabel>
        <Select
          size="sm"
          value={status}
          onChange={(event, newValue) => {
            router.push(pathname + '?' + createQueryString('status', newValue!));
            setStatus(newValue!);
          }}
        >
          <Option value="1">Ativos</Option>
          <Option value="2">Inativos</Option>
          <Option value="3">Esperando autorização</Option>
          <Option value="4">Todos</Option>
        </Select>
      </FormControl>
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
          {usuarios && usuarios.map((usuario) => (
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
          ))}
        </tbody>
      </Table>
      <Pagination
        pagina={pagina}
        limite={limite}
        total={total}
      />
    </Content>
  );
}