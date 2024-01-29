'use client'

import Content from "@/components/Content";
import { useEffect, useState } from "react";
import * as alvaraTiposService from "@/shared/services/alvara-tipo.services";
import { IAlvaraTipo } from "@/shared/services/alvara-tipo.services";

export default function AlvaraTipoDetalhes(props: any) {
    const [alvaraTipo, setAlvaraTipo] = useState<IAlvaraTipo>();
    const { id } = props.params;

    useEffect(() => {
        if (id) {
            alvaraTiposService.buscarPorId(id)
                .then((response: IAlvaraTipo) => {
                    setAlvaraTipo(response);
                });
        }
    }, []);
    return (
        <Content
            breadcrumbs={[
                { label: 'Tipos de alvará', href: '/alvara-tipos' },
                { label: 'Detalhes', href: '/alvara-tipos/detalhes/' + id },
            ]}
            titulo={id ? 'Detalhes' : 'Novo'}
            pagina="usuarios"
        >
            <div>{JSON.stringify(alvaraTipo)}</div>
        </Content>
    );
}
