'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { IUnidade } from "./unidade/unidade.services";

async function Logout() {
    await signOut({ redirect: false });
    window.location.href = '/login';
}

export interface IUsuario {
    id: string;
    nome: string;
    email: string;
    login: string;
    permissao: string;
    cargo: string;
    status: number;
    criado_em: Date;
    atualizado_em: Date;
    unidade_id?: string;
    ferias?: IFerias[];
    substitutos?: ISubstituto[];
    usuarios?: ISubstituto[];
    unidade?: IUnidade;
}

export interface IFerias {
    id: string;
    inicio: Date;
    final: Date;
    usuario_id: string;
    usuario?: IUsuario;
    criado_em: Date;
    atualizado_em: Date;
}

export interface ISubstituto {
    id: string;
    usuario_id: Date;
    usuario?: IUsuario;
    substituto_id: string;
    substituto?: IUsuario;
}

export interface IAddFeriasUsuario {
    inicio: Date;
    final: Date;
}

export interface ICreateUsuario {
    nome: string;
    email: string;
    login: string;
    permissao: string;
    cargo: string;
    unidade_id?: string;
}

export interface IUpdateUsuario {
    id?: string;
    permissao?: string;
    cargo?: string;
    status?: number;
    unidade_id?: string;
}

export interface IPaginadoUsuario {
    data: IUsuario[];
    total: number;
    pagina: number;
    limite: number;
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

function formataNome(nome: string) {
    const nomes = nome.split(' ');
    return nomes[0] + ' ' + nomes[nomes.length - 1];
}

async function listaCompleta(): Promise<IUsuario[]> {
    const session = await getServerSession(authOptions);
    const usuarios = fetch(`${baseURL}usuarios/lista-completa`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return usuarios;
}

async function buscarTudo(status: number = 1, pagina: number = 1, limite: number = 10, busca: string = '', permissao: string = '', cargo: string = ''): Promise<IPaginadoUsuario> {
    const session = await getServerSession(authOptions);
    const usuarios = fetch(`${baseURL}usuarios/buscar-tudo?status=${status}&pagina=${pagina}&limite=${limite}&busca=${busca}&permissao=${permissao}&cargo=${cargo}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return usuarios;
}

async function buscarPorId(id: string): Promise<IUsuario> {
    const session = await getServerSession(authOptions);
    const usuario = await fetch(`${baseURL}usuarios/buscar-por-id/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return usuario;
}

async function autorizar(id: string): Promise<{ autorizado: boolean }> {
    const session = await getServerSession(authOptions);
    const autorizado = fetch(`${baseURL}usuarios/autorizar/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status !== 200) return;
        return response.json();
    })
    return autorizado;
}

async function criar(data: ICreateUsuario): Promise<IUsuario> {
    const session = await getServerSession(authOptions);
    const criado = fetch(`${baseURL}usuarios/criar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }, body: JSON.stringify(data)
    }).then((response) => {
        if (response.status === 401) Logout();
        // if (response.status !== 200) return;
        return response.json();
    })
    return criado;
}

async function atualizar(id: string, data: IUpdateUsuario): Promise<IUsuario> {
    const session = await getServerSession(authOptions);
    const autorizado = await fetch(`${baseURL}usuarios/atualizar/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }, body: JSON.stringify(data)
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status !== 200) return;
        return response.json();
    })
    return autorizado;
}

async function desativar(id: string): Promise<{ desativado: boolean }> {
    const session = await getServerSession(authOptions);
    const desativado = fetch(`${baseURL}usuarios/desativar/${id}`, {
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

async function validaUsuario(): Promise<IUsuario> {
    const session = await getServerSession(authOptions);
    const usuario = fetch(`${baseURL}usuarios/valida-usuario`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    }).catch((error) => {
        Logout();
    })
    return usuario;
}

async function buscarNovo(login: string): Promise<{ id?: string, login?: string, nome?: string, email?: string, unidade_id?: string, message?: string }> {
    const session = await getServerSession(authOptions);
    const usuario = fetch(`${baseURL}usuarios/buscar-novo?login=${login}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status === 403) {
            return { message: 'Usuário já cadastrado.' }
        }
        if (response.status !== 200) return;
        return response.json();
    })
    return usuario;
}

async function adicionaFerias(id: string, data: IAddFeriasUsuario): Promise<IFerias> {
    const session = await getServerSession(authOptions);
    const ferias = await fetch(`${baseURL}usuarios/adiciona-ferias/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }, body: JSON.stringify(data)
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status !== 200) return;
        return response.json();
    })
    return ferias;
}

async function adicionarSubstituto(usuario_id: string, substituto_id: string): Promise<ISubstituto> {
    const session = await getServerSession(authOptions);
    const substituto = await fetch(`${baseURL}usuarios/adicionar-substituto`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }, body: JSON.stringify({ usuario_id, substituto_id })
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status !== 201) return;
        return response.json();
    })
    return substituto;
}

async function removerSubstituto(id: string): Promise<boolean> {
    const session = await getServerSession(authOptions);
    const substituto = await fetch(`${baseURL}usuarios/remover-substituto/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status !== 200) return;
        return response.json();
    })
    return substituto;
}

async function buscarAdministrativos(): Promise<IUsuario[]> {
    const session = await getServerSession(authOptions);
    const administrativos = fetch(`${baseURL}usuarios/buscar-administrativos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status !== 200) return;
        return response.json();
    })
    return administrativos;
}

async function buscarFuncionarios(): Promise<{ administrativos: IUsuario[], tecnicos: IUsuario[] }> {
    const session = await getServerSession(authOptions);
    const funcionarios = fetch(`${baseURL}usuarios/buscar-funcionarios`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        if (response.status !== 200) return;
        return response.json();
    })
    return funcionarios;
}

export {
    adicionaFerias,
    adicionarSubstituto,
    atualizar,
    autorizar,
    buscarAdministrativos,
    buscarNovo,
    buscarPorId,
    buscarTudo,
    criar,
    desativar,
    formataNome,
    listaCompleta,
    removerSubstituto,
    validaUsuario,
    buscarFuncionarios
};
