'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

async function Logout() {
    await signOut({ redirect: false });
    window.location.href = '/login';
}

export interface IReunioes {
    mes: string;
    ano: string;
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

export { buscarPorMesAno, buscarPorData }