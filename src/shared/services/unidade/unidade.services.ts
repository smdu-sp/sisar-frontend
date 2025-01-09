'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { IPaginadoUnidade, IUnidade } from "@/types/unidade/unidade.dto";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

async function Logout() {
    await signOut({ redirect: false });
    window.location.href = '/login';
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

async function listaCompleta(): Promise<IUnidade[]> {
    const session = await getServerSession(authOptions);
    const unidades = await fetch(`${baseURL}unidades/lista-completa`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return unidades;
}

async function buscarTudo(filtro: string | null, pagina: number = 1, limite: number = 10, busca: string | null): Promise<IPaginadoUnidade> {
  const session = await getServerSession(authOptions);
  if (!filtro) filtro = null;
  const unidade: IPaginadoUnidade = await fetch(
    `${baseURL}unidades/buscar-tudo?filtro=${filtro}&pagina=${pagina}&limite=${limite}&busca=${busca}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.access_token}`
    }
  }).then((response) => {
    if (response.status === 401) Logout();
    return response.json();
  });
  return unidade;
}

async function buscarPorId(id: string): Promise<IUnidade> {
    const session = await getServerSession(authOptions);
    const unidade = await fetch(`${baseURL}unidades/buscar-por-id/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return unidade;
}

async function criar({ nome, codigo, sigla, status }: { nome: string, codigo: string, sigla: string, status: number }): Promise<IUnidade> {
    const session = await getServerSession(authOptions);
    const novaUnidade = await fetch(`${baseURL}unidades/criar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
            nome,
            sigla,
            codigo,
            status
        })
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status !== 201) return;
        return response.json();
    });
    return novaUnidade;
}

async function atualizar({ id, nome, codigo, sigla, status }: { id: string, nome: string, codigo: string, sigla: string, status: number }): Promise<IUnidade> {
    const session = await getServerSession(authOptions);
    const atualizado = await fetch(`${baseURL}unidades/atualizar/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
            nome,
            sigla,
            codigo,
            status
        })
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status !== 200) return;
        return response.json();
    });
    return atualizado;
}

async function desativar({id, status}: { id: string, status: number }): Promise<IUnidade> {
    const session = await getServerSession(authOptions);
    const desativado = await fetch(`${baseURL}unidades/desativar/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body:  JSON.stringify({ status })
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status !== 200) return;
        return response.json();
    });
    return desativado;
}

async function ativar(id: string): Promise<IUnidade> {
    const session = await getServerSession(authOptions);
    const ativado = await fetch(`${baseURL}unidades/atualizar/${id}`, {
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
