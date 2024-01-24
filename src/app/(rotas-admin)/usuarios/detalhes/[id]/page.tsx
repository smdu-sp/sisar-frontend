'use client'

import Content from "@/components/Content";
import { IUsuario } from "@/shared/services/usuario.services";
import { useEffect, useState } from "react";
import * as usuarioServices from "@/shared/services/usuario.services";

export default function UsuarioDetalhes(props: any) {
    const [usuario, setUsuario] = useState<IUsuario>();
    const { id } = props.params;

    useEffect(() => {
        if (id) {
            usuarioServices.buscarPorId(id)
                .then((response: IUsuario) => {
                    setUsuario(response);
                });
        }
    }, []);
    return (
        <Content
            breadcrumbs={[
                { label: 'Usuários', href: '/usuarios' },
                { label: 'Detalhes', href: '/usuarios/detalhes/' + id },
            ]}
            titulo={id ? 'Detalhes' : 'Novo'}
            pagina="usuarios"
        >
            <div>{JSON.stringify(usuario)}</div>
        </Content>
    );
}
