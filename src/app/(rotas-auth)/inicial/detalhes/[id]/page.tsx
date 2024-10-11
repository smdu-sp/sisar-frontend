'use client'

import Content from "@/components/Content";
import * as inicialServices from '@/shared/services/inicial.services';
import * as usuarioServices from '@/shared/services/usuario.services';
import ContentTabs from './content';
import { useEffect, useState } from "react";
import { IInicial } from "@/shared/services/inicial.services";
import { IUsuario } from "@/shared/services/usuario.services";

export default function InicialDetalhes(props: any, novoProcesso: string | null) {
    const { id } = props.params;
    const [inicial, setInicial] = useState<IInicial>();
    const [funcionarios, setFuncionarios] = useState<{ administrativos: IUsuario[]; tecnicos: IUsuario[]; }>();

    const breadcrumbs = [{
        label: 'Processos',
        href: '/inicial'
    }, {
        label: 'Detalhes',
        href: '/inicial/detalhes'
    }]

    useEffect(() => {
        if (id) {
            inicialServices.buscarPorId(parseInt(id)).then((inicial) => {
                setInicial(inicial)
            })
            usuarioServices.buscarFuncionarios().then((funcionarios) => {
                setFuncionarios(funcionarios)
            })
        }
    }, [id])

    return (
        <Content
            titulo={id ? `Processo #${id}` : 'Novo processo'}
            breadcrumbs={breadcrumbs}
        >
            <ContentTabs inicial={inicial} funcionarios={funcionarios} novoProcesso={novoProcesso} />
        </Content>
    )
}