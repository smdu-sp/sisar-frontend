'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/authOptions";
import { signOut } from "next-auth/react";
import { IFinalizacaoResponse, IFinalizacao } from "@/types/finalizacao/finalizacao.dto";

const baseURL = process.env.API_URL || 'http://localhost:3000/';

async function criar(data: IFinalizacao, conclusao: boolean): Promise<IFinalizacaoResponse> {
    const newConclusao = conclusao ? 'true' : 'false';
    const session = await getServerSession(authOptions);
    const finalizacao = await fetch(`${baseURL}finalizacao/criar?conclusao=${newConclusao}`, {
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
    return finalizacao;
}

async function BuscaId(id: number): Promise<IFinalizacaoResponse> {
    const session = await getServerSession(authOptions);
    const finalizacao = await fetch(`${baseURL}finalizacao/buscar/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        return response.json();
    })
    return finalizacao;
}

export {
    criar,
    BuscaId
}
