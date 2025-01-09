'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { IPaginadoSubprefeitura, ISubprefeitura } from "@/types/subprefeitura/subprefeitura.dto";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

async function Logout() {
    await signOut({ redirect: false });
    window.location.href = '/login';
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
    const desativado = await fetch(`${baseURL}subprefeitura/atualizar/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ status: 0 })
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status !== 200) return;
        return response.json();
    });
    return desativado;
}

async function criar({ nome, sigla, status }: { nome: string, sigla: string, status: number }): Promise<ISubprefeitura> {
    const session = await getServerSession(authOptions);
    const novaSubprefeitura = await fetch(`${baseURL}subprefeitura/criar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ 
            nome,
            sigla,
            status
        })
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status !== 201) return;
        return response.json();
    });
    return novaSubprefeitura;
}

async function atualizar({ id, nome, sigla, status }: { id: string, nome: string, sigla: string, status: number }): Promise<ISubprefeitura> {
    const session = await getServerSession(authOptions);
    const atualizado = await fetch(`${baseURL}subprefeitura/atualizar/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
            nome,
            sigla,
            status
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
        body: JSON.stringify({ status: 1 })
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
