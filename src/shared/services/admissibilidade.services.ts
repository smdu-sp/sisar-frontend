'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { IUsuario } from "./usuario.services";

async function Logout() {
    await signOut({ redirect: false });
    window.location.href = '/login';
}
export interface IInicial_Sqls {
    id: string
    inicial_id: number
    sql: string
    criado_em: Date
    alterado_em: Date

}
export interface IAlvaraTipo {
    id:                     string
    nome:                   string
    prazo_admissibilidade:  number
    prazo_analise_smul1:    number
    prazo_analise_smul2:    number
    prazo_analise_multi1:   number
    prazo_analise_multi2:   number
    status:                 boolean
}

export interface IDistribuicao {
    inicial_id: number
    tecnico_responsavel?: IUsuario
    tecnico_responsavel_id?: string
    administrativo_responsavel?: IUsuario
    administrativo_responsavel_id: string
    processo_relacionado_incomum?: string
    assunto_processo_relacionado_incomum?: string
    baixa_pagamento: boolean
    obs?: string
    criado_em: Date
    alterado_em: Date
}

export interface IInicial {
    id: number
    decreto: boolean
    sei: string
    tipo_requerimento: string
    requerimento: string
    aprova_digital?: string
    processo_fisico?: string
    data_protocolo: Date
    envio_admissibilidade?: Date
    alvara_tipo_id: string
    alvara_tipo: IAlvaraTipo
    tipo_processo: number
    obs?: string
    status: number
    iniciais_sqls?: IInicial_Sqls[]
    interfaces?: IInterfaces
    distribuicao?: IDistribuicao
}

export interface IInterfaces {
    inicial_id: number;
    interface_sehab: boolean
    num_sehab?: string
    interface_siurb: boolean
    num_siurb?: string
    interface_smc: boolean
    num_smc?: string
    interface_smt: boolean
    num_smt?: string
    interface_svma: boolean
    num_svma?: string
    criado_em: Date
    alterado_em: Date
}

export interface IAdmissibilidade {
    inicial_id: number;
    unidade_id?: string;
    data_envio?: Date;
    data_decisao_interlocutoria?: Date;
    parecer: boolean;
    subprefeitura_id?: string;
    categoria_id?: string;
    status?: number;
    inicial?: IInicial;
}

export interface ICreateAdmissibilidade {
    inicial_id: number;
    unidade_id?: string;
    data_envio?: Date;
    data_decisao_interlocutoria?: Date;
    parecer: boolean;
    subprefeitura_id?: string;
    categoria_id?: string;
}

export interface IPaginadoAdmissibilidade {
    data: IAdmissibilidade[];
    total: number;
    pagina: number;
    limite: number;
}

export interface IPaginatedInicial {
    data: IAdmissibilidade[];
    total: number;
    pagina: number;
    limite: number;
}

const baseURL = 'http://localhost:3000/';

const criar = async (dataCreate: ICreateAdmissibilidade) => {
    const session = await getServerSession(authOptions);
    const admissibilidade = await fetch(`${baseURL}admissibilidade/criar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(dataCreate)
    }).then ((response) => {
        if(response.status === 401) signOut();
        if(response.status !== 201) return;
        return response.json();
    });
    return admissibilidade;
}

const buscarTudo = async (
    pagina: number,
    limite: number,
    filtro: number
): Promise<IPaginadoAdmissibilidade> => {
    const session = await getServerSession(authOptions);
    const admissibilidades = await fetch(`${baseURL}admissibilidade/buscar-tudo?pagina=${pagina}&limite=${limite}&filtro=${filtro}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return admissibilidades;
}
const buscarId = async (id: string): Promise<IAdmissibilidade> => {
    const session = await getServerSession(authOptions);
    const admissibilidades = await fetch(`${baseURL}admissibilidade/buscar-id/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return admissibilidades;
}

const atualizarId = async (id: number, status: number, unidade_id: string, data_decisao: Date, subprefeitura_id: string): Promise<IAdmissibilidade> => {
    const session = await getServerSession(authOptions);
    const admissibilidades = await fetch(`${baseURL}admissibilidade/atualizar-id/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ status: status, unidade_id: unidade_id, data_decisao_interlocutoria: data_decisao, subprefeitura_id: subprefeitura_id })
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return admissibilidades;
}

export { criar, buscarTudo, buscarId, atualizarId };