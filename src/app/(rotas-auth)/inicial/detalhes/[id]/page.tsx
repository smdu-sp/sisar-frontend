'use server'

import Content from "@/components/Content";
import * as inicialServices from '@/shared/services/inicial/inicial.services';
import * as usuarioServices from '@/shared/services/usuario/usuario.services';
import ContentTabs from './content';
import { useEffect, useState } from "react";
import { IInicial } from "@/shared/services/inicial/inicial.services";
import { IUsuario } from "@/shared/services/usuario/usuario.services";

export default async function InicialDetalhes(props: any) {
    const { id } = props.params;
    const inicial = id && await inicialServices.buscarPorId(id);
    const funcionarios = await usuarioServices.buscarFuncionarios();
    
    const breadcrumbs = [{
        label: 'Processos',
        href: '/inicial'
    }, {
        label: 'Detalhes',
        href: '/inicial/detalhes'
    }]

    return (
        <Content
            titulo={id ? `Processo #${id}` : 'Novo processo'}
            breadcrumbs={breadcrumbs}
        >
            <ContentTabs inicial={inicial} funcionarios={funcionarios} />
        </Content>
    )
}