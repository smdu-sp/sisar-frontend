'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IAlvaraTipo } from "./alvara-tipo.services";

export interface IInicial {
    id: number
    decreto: boolean
    sei: string
    num_sql: string
    tipo_requerimento: string
    requerimento: string
    aprova_digital: string | null
    processo_fisico: string | null
    data_protocolo: Date
    envio_admissibilidade: Date | null
    alvara_tipo_id: string
    alvara_tipo: IAlvaraTipo
    tipo_processo: string
    obs: string | null
    status: string    
}

export interface IUpdateInicial extends Partial<ICreateInicial> {}

export interface ICreateInicial {
    id: number
    decreto: boolean
    sei: string
    num_sql: string
    tipo_requerimento: string
    requerimento: string
    aprova_digital: string | null
    processo_fisico: string | null
    data_protocolo: Date
    envio_admissibilidade: Date | null
    tipo_alvara: string
    tipo_processo: string
    obs: string | null
    status: string
}

export interface IPaginatedInicial {
    data: IInicial[];
    total: number;
    pagina: number;
    limite: number;
}

const baseURL = 'http://localhost:3000/';

const buscarTudo = async (
    pagina: number = 1,
    limite: number = 10,
): Promise<IPaginatedInicial> => {
    const session = await getServerSession(authOptions);
    const iniciais = await fetch(`${baseURL}iniciais/buscar-tudo?pagina=${pagina}&limite=${limite}`, {
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

export {
    buscarTudo,
}
