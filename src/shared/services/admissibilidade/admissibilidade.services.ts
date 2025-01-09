'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { IAdmissibilidade, ICreateAdmissibilidade, IPaginadoAdmissibilidade, IUpdateAdmissibilidade } from "@/types/admissibilidade/admissibilidade.dto";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

async function Logout() {
    await signOut({ redirect: false });
    window.location.href = '/login';
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

const criar = async (dataCreate: ICreateAdmissibilidade) => {
    const session = await getServerSession(authOptions);
    const admissibilidade = await fetch(`${baseURL}admissibilidade/criar`, {
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
    return admissibilidade;
}

const buscarTudo = async (
    pagina: number,
    limite: number,
    filtro: number
): Promise<IPaginadoAdmissibilidade> => {
    const session = await getServerSession(authOptions);
    const admissibilidades = await fetch(`${baseURL}admissibilidade/buscar-tudo?pagina=${pagina}&limite=${limite}&filtro=${filtro}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return admissibilidades;
}

const buscarId = async (id: string): Promise<IAdmissibilidade> => {
    const session = await getServerSession(authOptions);
    const admissibilidades = await fetch(`${baseURL}admissibilidade/buscar-id/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return admissibilidades;
}

const numeroPrazoExcedido = async(): Promise<number> =>{
    const session = await getServerSession(authOptions);
    const response = await fetch(`${baseURL}admissibilidade/contar-fora-prazo`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    });
    const prazoExcedido = await response.json();
    return prazoExcedido;
}

const numeroDentroPrazo = async(): Promise<number> =>{
    const session = await getServerSession(authOptions);
    const response = await fetch(`${baseURL}admissibilidade/contar-dentro-prazo`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    });
    const dentroDoPrazo = await response.json();
    return dentroDoPrazo;
}

const admissibilidadeFinalizada = async(): Promise<number> =>{
    const session = await getServerSession(authOptions);
    const response = await fetch(`${baseURL}admissibilidade/admissibilidade-finalizada`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    });
    const quantidadeAdmissibilidadeFinalizada = await response.json();
    return quantidadeAdmissibilidadeFinalizada;
}

const atualizarId = async (id: number, updateAdmissibilidade: IUpdateAdmissibilidade): Promise<IAdmissibilidade> => {
    const session = await getServerSession(authOptions);
    const admissibilidades = await fetch(`${baseURL}admissibilidade/atualizar-id/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(updateAdmissibilidade)
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return admissibilidades;
}

const medianaAdmissibilidade = async (): Promise<number> =>{
    const session = await getServerSession(authOptions);
    const response = await fetch(`${baseURL}admissibilidade/mediana-admissibilidade`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    });
    const medianaAdmissibilidade = await response.json();
    return medianaAdmissibilidade;
}

const pegarRegistrosAdmissibilidade = async (): Promise<any> =>{
    const session = await getServerSession(authOptions);
    const response = await fetch(`${baseURL}admissibilidade/registros-admissibilidade`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    });
    const pegarRegistrosAdmissibilidade = await response.json();
    return pegarRegistrosAdmissibilidade;

}

export { criar, buscarTudo, buscarId, atualizarId, numeroPrazoExcedido, numeroDentroPrazo, admissibilidadeFinalizada, medianaAdmissibilidade, pegarRegistrosAdmissibilidade };
