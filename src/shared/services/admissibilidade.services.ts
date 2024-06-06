'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

async function Logout() {
    await signOut({ redirect: false });
    window.location.href = '/login';
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
    limite: number
): Promise<IPaginadoAdmissibilidade> => {
    const session = await getServerSession(authOptions);
    const admissibilidades = await fetch(`${baseURL}admissibilidade/buscar-tudo?pagina=${pagina}&limite=${limite}`, {
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

const atualizarId = async (id: number, status: number): Promise<IAdmissibilidade> => {
    const session = await getServerSession(authOptions);
    const admissibilidades = await fetch(`${baseURL}admissibilidade/atualizar-id/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ status: status })
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return admissibilidades;
}

export { criar, buscarTudo, buscarId, atualizarId };