'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IAlvaraTipo } from "./alvara-tipo.services";
import { signOut } from "next-auth/react";

export interface IInicial {
    id: number
    decreto: boolean
    sei: string
    tipo_requerimento: string
    requerimento: string
    aprova_digital: string | null
    processo_fisico: string | null
    data_protocolo: Date
    envio_admissibilidade: Date | null
    alvara_tipo_id: string
    alvara_tipo: IAlvaraTipo
    tipo_processo: number
    obs: string | null
    status: number    
}

export interface IUpdateInicial extends Partial<ICreateInicial> {}

export interface ICreateInicial {
    id?: number
    decreto: boolean
    sei: string
    tipo_requerimento: string
    requerimento: string
    aprova_digital: string | null
    processo_fisico: string | null
    data_protocolo: Date
    envio_admissibilidade: Date | null
    alvara_tipo_id: string
    tipo_processo: number
    obs: string | null
    status: number
}

export interface IPaginatedInicial {
    data: IInicial[];
    total: number;
    pagina: number;
    limite: number;
}

const baseURL = 'http://localhost:3000/';

const buscarTudo = async (
    pagina: number,
    limite: number
): Promise<IPaginatedInicial> => {
    const session = await getServerSession(authOptions);
    const iniciais = await fetch(`${baseURL}inicial/buscar-tudo?pagina=${pagina}&limite=${limite}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        // if (response.status === 401) Logout();
        return response.json();
    })
    return iniciais;
}

const buscarPorId = async (id: number): Promise<IInicial> => {
    const session = await getServerSession(authOptions);
    const iniciais = await fetch(`${baseURL}inicial/buscar-por-id/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        // if (response.status === 401) Logout();
        return response.json();
    })
    return iniciais;
}


const criar = async (dataCreate: ICreateInicial): Promise<IInicial> => {
    const session = await getServerSession(authOptions);

    // var teste = dataCreate.data_protocolo.toString().split('T')[0];
    
    const iniciais = await fetch(`${baseURL}inicial/criar`, {
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
    return iniciais;
}

export {
    buscarTudo,
    buscarPorId,
    criar
}
