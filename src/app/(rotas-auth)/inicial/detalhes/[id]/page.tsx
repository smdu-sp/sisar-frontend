import * as React from 'react';
import Content from "@/components/Content";
import * as inicialServices from '@/shared/services/inicial.services';
import * as usuarioServices from '@/shared/services/usuario.services';
import ContentTabs from './content';
import { IconButton } from '@mui/material';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';

export default async function InicialDetalhes(props: any, novoProcesso: string | null) {
    const { id } = props.params;
    const inicial = id ? await inicialServices.buscarPorId(parseInt(id)) : undefined;
    const funcionarios = id ? await usuarioServices.buscarFuncionarios() : undefined;

    return (
        <Content
            titulo={id ? `Processo #${id}` : 'Novo processo'}
            pagina='inicial'
            breadcrumbs={[{
                label: 'Processos',
                href: '/inicial'
            }, {
                label: 'Detalhes',
                href: '/inicial/detalhes'
            }]}
        >
            <ContentTabs inicial={inicial} funcionarios={funcionarios} novoProcesso={novoProcesso} />
        </Content>
    )
}