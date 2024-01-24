'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export interface IUsuario {
    id: string;
    nome: string;
    login: string;
    permissao: string;
    cargo: string;
    status: number;
    criado_em: Date;
    atualizado_em: Date;
}

export interface IPaginadoUsuario {
    data: IUsuario[];
    total: number;
    pagina: number;
    limite: number;
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

async function buscarTudo(): Promise<IPaginadoUsuario> {
    const session = await getServerSession(authOptions);
    const usuarios = await fetch(`${baseURL}usuario/buscar-tudo`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        return response.json();
    })
    return usuarios;
}

async function buscarPorId(id: string): Promise<IUsuario> {
    const session = await getServerSession(authOptions);
    const usuario = await fetch(`${baseURL}usuario/buscar-por-id/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        return response.json();
    })
    return usuario;
}

export { 
    buscarTudo,
    buscarPorId
};
