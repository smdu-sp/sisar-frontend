'use client'

import Content from '@/components/Content';
import { useEffect, useState } from 'react';
import * as usuarioServices from '@/shared/services/usuario.services';
import { Chip, IconButton, Table, Tooltip } from '@mui/joy';
import { Cancel, Edit } from '@mui/icons-material';
import { IPaginadoUsuario, IUsuario } from '@/shared/services/usuario.services';
import { useRouter } from 'next/navigation';
import { Pagination } from '@/components/Pagination';

export default function AlvaraTipos() {
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [pagina, setPagina] = useState(2);
  const [limite, setLimite] = useState(10);
  const [total, setTotal] = useState(100);

  const router = useRouter();

  useEffect(() => {
    usuarioServices.buscarTudo()
      .then((response: IPaginadoUsuario) => {
        setTotal(response.total);
        setPagina(response.pagina);
        setLimite(response.limite);
        setUsuarios(response.data);
      });
  }, []);
  const permissoes = {
    'DEV': { label: 'Desenvolvedor', value: 'DEV', color: 'primary' },
    'SUP': { label: 'Superusuario', value: 'SUP', color: 'info' },
    'ADM': { label: 'Administrador', value: 'ADM', color: 'success' },
    'USR': { label: 'Usário', value: 'USR', color: 'warning' },
  }
  const cargos = {
    'ADM': { label: 'Administrativo', value: 'ADM', color: 'success' },
    'TEC': { label: 'Técnico', value: 'TEC', color: 'warning' },
  }
  return (
    <Content
      breadcrumbs={[
        { label: 'Tipos de alvará', href: '/alvara-tipos' }
      ]}
      titulo='Tipos de alvará'
      pagina='/alvara-tipos'
    >
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
          {usuarios.map((usuario) => (
            <tr key={usuario.id} style={{ cursor: 'pointer' }} onClick={() => router.push(`/usuarios/detalhes/${usuario.id}`)}>
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
      <Pagination />
    </Content>
  );
}