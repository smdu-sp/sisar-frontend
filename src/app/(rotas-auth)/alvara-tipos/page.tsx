'use client'

import Content from '@/components/Content';
import { useEffect, useState } from 'react';
import * as usuarioServices from '@/shared/services/usuario.services';
import { Button, Chip, IconButton, Table, Tooltip } from '@mui/joy';
import { Cancel, Edit } from '@mui/icons-material';
import { IPaginadoUsuario, IUsuario } from '@/shared/services/usuario.services';
import { useRouter } from 'next/navigation';
import { Pagination } from '@/components/Pagination';
import * as alvaraTipoService from '@/shared/services/alvara-tipo.services';
import { IPaginadoAlvaraTipo, IAlvaraTipo } from '@/shared/services/alvara-tipo.services';

export default function AlvaraTipos() {
  const [alvaraTipos, setAlvaraTipos] = useState<IAlvaraTipo[]>([]);
  const [pagina, setPagina] = useState(2);
  const [limite, setLimite] = useState(10);
  const [total, setTotal] = useState(100);

  const router = useRouter();

  useEffect(() => {
    alvaraTipoService.buscarTudo()
      .then((response: IPaginadoAlvaraTipo) => {
        setTotal(response.total);
        setPagina(response.pagina);
        setLimite(response.limite);
        setAlvaraTipos(response.data);
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
            <th>Admissibilidade</th>
            <th>1ª ANÁLISE PRÓPRIO DA SMUL</th>
            <th>2ª ANÁLISE PRÓPRIO DA SMUL</th>
            <th>1ª ANÁLISE MÚLTIPLAS</th>
            <th>2ª ANÁLISE MÚLTIPLAS</th>
          </tr>
        </thead>
        <tbody>
          {alvaraTipos.map((alvaraTipo) => (
            <tr key={alvaraTipo.id} style={{ cursor: 'pointer' }} onClick={() => router.push(`/alvara-tipos/detalhes/${alvaraTipo.id}`)}>
              <td>{alvaraTipo.nome}</td>
              <td>{alvaraTipo.prazo_admissibilidade}</td>
              <td>{alvaraTipo.prazo_analise_smul1}</td>
              <td>{alvaraTipo.prazo_analise_smul2}</td>
              <td>{alvaraTipo.prazo_analise_multi1}</td>
              <td>{alvaraTipo.prazo_analise_multi2}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination />
      <Button
        component="a"
        href="alvara-tipos/detalhes"
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
    </Content>
  );
}