'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { IProcesso } from "@/types/reunioes/reunioes.dto";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

async function Logout() {
    await signOut({ redirect: false });
    window.location.href = '/login';
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

async function buscarPorMesAno(mes: string, ano: string){
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}reunioes/buscar/${mes}/${ano}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return reunoes;
}

async function buscarPorData(data: string){
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}reunioes/buscar-data/${data}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return reunoes;
}

async function reagendarReuniao(id: string, data: Date, motivo: string) {
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}reunioes/atualizar-data/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
            nova_data_reuniao: data,
            justificativa_remarcacao: motivo
        })
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return reunoes;
}

async function buscarPorDataProcesso(data: string): Promise<IProcesso[]> {
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}inicial/buscar-data-processo/${data}`, {
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

export { buscarPorMesAno, buscarPorData, reagendarReuniao, buscarPorDataProcesso }
