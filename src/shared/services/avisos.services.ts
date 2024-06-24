'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/auth/authOptions";
import { signOut } from "next-auth/react";
import { promises } from "dns";



export interface ICreateAvisos{
    titulo: string
    descricao: string
    data?: Date
    inicial_id?: number
    tipo: number
}

export interface IUpdateAvisos extends Partial<ICreateAvisos> {}

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
    tipo_processo: number
    pagamento: number
    obs?: string
    status: number
}

export interface IAvisos {
    titulo: string
    descricao: string
    data?: Date
    inicial_id?: number
    iniciais?: IInicial[]
}
const baseURL = 'http://localhost:3000/';

const criar = async (dataCreate: ICreateAvisos): Promise<IAvisos> => {
    const session = await getServerSession(authOptions);
    const avisos = await fetch(`${baseURL}avisos/criar`, {
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
    return avisos;
}

const buscarDia = async (data: string) => {
    const session = await getServerSession(authOptions);
    const avisos = await fetch(`${baseURL}avisos/buscar/${data}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then ((response) => {
        if(response.status === 401) signOut();
        return response.json();
    });
    return avisos;
}

async function buscarPorMesAno(mes: string, ano: string){
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}avisos/buscar/${mes}/${ano}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        return response.json();
    })
    return reunoes;
}

async function atualizar(id: string, titulo: string, descricao: string, data?: Date, inicial_id?: number): Promise<IAvisos> {
    const session = await getServerSession(authOptions);
    const atualizado = await fetch(`${baseURL}avisos/atualizar/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
            titulo, descricao, data, inicial_id
        })
    }).then((response) => {
        if (response.status === 401) signOut();
        return response.json();
    });
    return atualizado;
}

async function excluir(id: string){
    const session = await getServerSession(authOptions);
    const atualizado = await fetch(`${baseURL}avisos/excluir/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        return response.json();
    });
    return atualizado;
}

export {criar, buscarDia, buscarPorMesAno, atualizar, excluir}