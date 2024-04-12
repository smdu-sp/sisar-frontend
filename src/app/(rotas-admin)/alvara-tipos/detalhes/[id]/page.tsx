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
    }, [ id ]);
    return (
        <Content
            breadcrumbs={[
                { label: 'Tipos de alvará', href: '/alvara-tipos' },
                { label: 'Detalhes', href: '/alvara-tipos/detalhes/' + id && id },
            ]}
            titulo={id ? 'Detalhes' : 'Novo'}
            pagina="alvara-tipos"
        >
        </Content>
    );
}
