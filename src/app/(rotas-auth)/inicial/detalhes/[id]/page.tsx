import * as React from 'react';
import Content from "@/components/Content";
import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import InicialTab from './tabs/inicial';
import * as inicialServices from '@/shared/services/inicial.services';
import * as admissibilidadeServices from '@/shared/services/admissibilidade.services';
import * as usuarioServices from '@/shared/services/usuario.services';
import AdmissibilidadeTab from './tabs/admissibilidade';
import DistribuicaoTab from './tabs/distribuicao';
import ContentTabs from './content';

export default async function InicialDetalhes(props: any) {
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
            <ContentTabs inicial={inicial} funcionarios={funcionarios} />
        </Content>
    )
}