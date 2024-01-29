'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";

export interface IAlvaraTipo {
    id:                     string
    nome:                   string
    prazo_admissibilidade:  number
    prazo_analise_smul1:    number
    prazo_analise_smul2:    number
    prazo_analise_multi1:   number
    prazo_analise_multi2:   number
}

export interface IPaginadoAlvaraTipo {
    data: IAlvaraTipo[]
    total: number
    pagina: number
    limite: number
}

export interface IUpdateAlvaraTipo extends Partial<ICreateAlvaraTipo> {}

export interface ICreateAlvaraTipo {
    nome:                   string
    prazo_admissibilidade:  number
    prazo_analise_smul1:    number
    prazo_analise_smul2:    number
    prazo_analise_multi1:   number
    prazo_analise_multi2:   number
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

const buscarTudo = async (): Promise<IPaginadoAlvaraTipo> => {
    const session = await getServerSession(authOptions);
    const alvaraTipos = await fetch(`${baseURL}alvara-tipo/buscar-tudo`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        if (response.status !== 200) return;
        return response.json();
    });
    return alvaraTipos;
}
 
const buscarPorId = async (id: string): Promise<IAlvaraTipo> => {
    const session = await getServerSession(authOptions);
    const alvaraTipo = await fetch(`${baseURL}alvara-tipo/buscar-por-id/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        if (response.status !== 200) return;
        return response.json();
    })
    return alvaraTipo;
}

const criar = async (dataCreate: ICreateAlvaraTipo): Promise<IAlvaraTipo> => {
    throw new Error('Not implemented');
}

const atualizar = async (id: string, dataUpdate: IUpdateAlvaraTipo): Promise<IAlvaraTipo | Error> => {
    throw new Error('Not implemented');
}

export {
    buscarTudo,
    buscarPorId,
    criar,
    atualizar
}