import { IInicial } from "@/shared/services/inicial.services"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import { signOut } from "next-auth/react";

export interface FinalizacaoPaginado {
    data: IFinalizacaoResponse[];
    total: number;
    pagina: number;
    limite: number;
}

export interface IFinalizacaoResponse {
    inicial: IInicial
    data_apostilamento: Date
    data_conclusao: Date
    data_emissao: Date
    data_outorga: Date
    data_resposta: Date
    data_termo: Date
    num_alvara: string
    obs: string
    outorga: boolean
}

export interface IFinalizacao{
    inicial_id: Number
    data_apostilamento: Date
    data_conclusao: Date
    data_emissao: Date
    data_outorga: Date
    data_resposta: Date
    data_termo: Date
    num_alvara: string
    obs: string
    outorga: boolean
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

async function criar(data: IFinalizacao): Promise<IFinalizacaoResponse> {
    const session = await getServerSession(authOptions);
    const subprefeituras = await fetch(`${baseURL}/finalizacao/criar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.status === 401) signOut();
        return response.json();
    })
    return subprefeituras;
}

export {
    criar
}