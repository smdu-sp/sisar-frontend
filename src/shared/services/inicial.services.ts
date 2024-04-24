'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/auth/authOptions";
import { IAlvaraTipo } from "./alvara-tipo.services";
import { signOut } from "next-auth/react";

export interface IInicial_Sqls {
    id: string
    inicial_id: number
    sql: string
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
    
}

export interface IUpdateInicial extends Partial<ICreateInicial> {}

export interface ICreateInicial {
    id?: number
    decreto: boolean
    sei: string
    tipo_requerimento: string
    requerimento: string
    aprova_digital?: string
    processo_fisico?: string
    data_protocolo: Date
    envio_admissibilidade?: Date
    alvara_tipo_id: string
    tipo_processo: number
    obs?: string
    nums_sql?: string[]
    status?: number
}

export interface IPaginatedInicial {
    data: IInicial[];
    total: number;
    pagina: number;
    limite: number;
}

const baseURL = 'http://localhost:3000/';

const buscarTudo = async (
    pagina: number,
    limite: number
): Promise<IPaginatedInicial> => {
    const session = await getServerSession(authOptions);
    const iniciais = await fetch(`${baseURL}inicial/buscar-tudo?pagina=${pagina}&limite=${limite}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        // if (response.status === 401) Logout();
        return response.json();
    })
    return iniciais;
}

const buscarPorId = async (id: number): Promise<IInicial> => {
    const session = await getServerSession(authOptions);
    const iniciais = await fetch(`${baseURL}inicial/buscar-por-id/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        // if (response.status === 401) Logout();
        return response.json();
    })
    return iniciais;
}


const criar = async (dataCreate: ICreateInicial): Promise<IInicial> => {
    const session = await getServerSession(authOptions);
    const iniciais = await fetch(`${baseURL}inicial/criar`, {
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
    return iniciais;
}

const atualizar = async (id: number, dataUpdate: IUpdateInicial): Promise<IInicial> => {
    const session = await getServerSession(authOptions);
    const iniciais = await fetch(`${baseURL}inicial/atualizar/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(dataUpdate)
    }).then ((response) => {
        if(response.status === 401) signOut();
        if(response.status !== 200) return;
        return response.json();
    });
    return iniciais;
}


const adicionaSql = async (id: number, sql: string): Promise<IInicial> => {
    const session = await getServerSession(authOptions);
    const iniciais = await fetch(`${baseURL}inicial/adiciona-sql/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ sql })
    }).then ((response) => {
        if(response.status === 401) signOut();
        if(response.status !== 200) return;
        return response.json();
    });
    return iniciais;
}

const removeSql = async (inicial_id: string, sql: string): Promise<boolean> => {
    const session = await getServerSession(authOptions);
    const iniciais = await fetch(`${baseURL}inicial/remove-sql/${inicial_id}/${sql}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then (async (response) => {
        if(response.status === 401) signOut();
        if(response.status !== 200) return;
        const resp = await response.json();
        return resp;
    });
    return iniciais;
}

export {
    atualizar,
    adicionaSql,
    buscarTudo,
    buscarPorId,
    criar,
    removeSql
}
