'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { parse } from "path";

async function Logout() {
    await signOut({ redirect: false });
    window.location.href = '/login';
}

export interface IParecer {
    id: string;
    parecer: string;
    status: number;
}

export interface ICriarParecer {
    parecer: string;
    status?: number;
}

export interface IPaginadoParecer {
    data: IParecer[];
    total: number;
    pagina: number;
    limite: number;
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';


async function buscarTudo(pagina: number = 1, limite: number = 10, busca: string = ''): Promise<IPaginadoParecer> {
    const session = await getServerSession(authOptions);
    const parecer = await fetch(`${baseURL}parecer-admissibilidade/buscar-tudo?pagina=${pagina}&limite=${limite}&busca=${busca}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return parecer;
}

async function buscarPorId(id: string): Promise<IParecer> {
    const session = await getServerSession(authOptions);
    const parecer = await fetch(`${baseURL}parecer-admissibilidade/buscar-por-id/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return parecer;
}

async function atualizar(id: string, data: ICriarParecer): Promise<IParecer> {
    const session = await getServerSession(authOptions);
    const parecer = await fetch(`${baseURL}parecer-admissibilidade/atualizar/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ ...data })
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return parecer;
}


async function desativar(id: string): Promise<IParecer> {
    const session = await getServerSession(authOptions);
    const parecer = await fetch(`${baseURL}parecer-admissibilidade/desativar/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return parecer;
}

async function criar({parecer, status}: {parecer: string, status: number}): Promise<IParecer> {
    const session = await getServerSession(authOptions);
    const parecerCriar = await fetch(`${baseURL}parecer-admissibilidade/criar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ parecer, status })
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return parecerCriar;
}

export {
    buscarTudo,
    buscarPorId,
    atualizar,
    desativar,
    criar
}