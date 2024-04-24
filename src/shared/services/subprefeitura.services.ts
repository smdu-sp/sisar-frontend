'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

async function Logout() {
    await signOut({ redirect: false });
    window.location.href = '/login';
}

export interface ISubprefeitura {
    id: string;
    nome: string;
}

export interface IPaginadoSubprefeitura {
    data: ISubprefeitura[];
    total: number;
    pagina: number;
    limite: number;
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

async function listaCompleta(): Promise<ISubprefeitura[]> {
    const session = await getServerSession(authOptions);
    const subprefeituras = await fetch(`${baseURL}subprefeitura/lista-completa`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return subprefeituras;
}

async function buscarTudo(status: string = 'true', pagina: number = 1, limite: number = 10, busca: string = ''): Promise<IPaginadoSubprefeitura> {
    const session = await getServerSession(authOptions);
    const subprefeituras = await fetch(`${baseURL}subprefeitura/buscar-tudo?status=${status}&pagina=${pagina}&limite=${limite}&busca=${busca}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return subprefeituras;
}

async function buscarPorId(id: string): Promise<ISubprefeitura> {
    const session = await getServerSession(authOptions);
    const subprefeitura = await fetch(`${baseURL}subprefeitura/buscar-por-id/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return subprefeitura;
}

async function desativar(id: string): Promise<{ autorizado: boolean }> {
    const session = await getServerSession(authOptions);
    const desativado = await fetch(`${baseURL}subprefeitura/desativar/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status !== 200) return;
        return response.json();
    });
    return desativado;
}

async function criar({nome}: { nome: string}): Promise<ISubprefeitura> {
    const session = await getServerSession(authOptions);
    const novaSubprefeitura = await fetch(`${baseURL}subprefeitura/criar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ 
            nome,
        })
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status !== 201) return;
        return response.json();
    });
    return novaSubprefeitura;
}

async function atualizar({ id, nome}: { id: string, nome: string}): Promise<ISubprefeitura> {
    const session = await getServerSession(authOptions);
    const atualizado = await fetch(`${baseURL}subprefeitura/atualizar/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
            nome,
        })
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status !== 200) return;
        return response.json();
    });
    return atualizado;
}

async function ativar(id: string): Promise<ISubprefeitura> {
    const session = await getServerSession(authOptions);
    const ativado = await fetch(`${baseURL}subprefeitura/atualizar/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ status: true })
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status !== 200) return;
        return response.json();
    });
    return ativado;
}

export { 
    ativar,
    atualizar,
    buscarTudo,
    buscarPorId,
    criar,
    desativar,
    listaCompleta
};
