'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/auth/authOptions";
import { signOut } from "next-auth/react";

export interface IAlvaraTipo {
    id:                             string
    nome:                           string
    status:                         number
    prazo_comunique_se:             number
    prazo_encaminhar_coord:         number
    prazo_admissibilidade_smul:     number
    reconsideracao_smul:            number
    reconsideracao_smul_tipo:       number
    analise_reconsideracao_smul:    number
    prazo_analise_smul1:            number
    prazo_analise_smul2:            number
    prazo_emissao_alvara_smul:      number
    prazo_admissibilidade_multi:    number
    reconsideracao_multi:           number
    reconsideracao_multi_tipo:      number
    analise_reconsideracao_multi:   number
    prazo_analise_multi1:           number
    prazo_analise_multi2:           number
    prazo_emissao_alvara_multi:     number
}

export interface IPaginadoAlvaraTipo {
    data: IAlvaraTipo[]
    total: number
    pagina: number
    limite: number
}

export interface auterarStatus {
    id: string
    status: number
}

export interface IUpdateAlvaraTipo extends Partial<ICreateAlvaraTipo> {} {}

export interface ICreateAlvaraTipo {
    nome:                           string
    prazo_admissibilidade_smul:     number
    reconsideracao_smul:            number
    reconsideracao_smul_tipo:       number
    analise_reconsideracao_smul:    number
    prazo_analise_smul1:            number
    prazo_analise_smul2:            number
    prazo_emissao_alvara_smul:      number
    prazo_admissibilidade_multi:    number
    reconsideracao_multi:           number
    reconsideracao_multi_tipo:      number
    analise_reconsideracao_multi:   number
    prazo_analise_multi1:           number
    prazo_analise_multi2:           number
    prazo_emissao_alvara_multi:     number
    prazo_comunique_se:             number
    prazo_encaminhar_coord:         number
    status:                         number
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

const listaCompleta = async (): Promise<IAlvaraTipo[]> => {
    const session = await getServerSession(authOptions);
    const alvaraTipos = fetch(`${baseURL}alvara-tipo/lista-completa`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then( async (response) => {
        if (response.status === 401) signOut();
        if (response.status !== 200) return;
        return await response.json();
    });
    return alvaraTipos;
}

const buscarTudo = async (pagina: number = 1, limite: number = 10): Promise<IPaginadoAlvaraTipo> => {
    const session = await getServerSession(authOptions);
    const alvaraTipos = fetch(`${baseURL}alvara-tipo/buscar-tudo?pagina=${pagina}&limite=${limite}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then( async (response) => {
        if (response.status === 401) signOut();
        if (response.status !== 200) return;
        return await response.json();
    });
    return alvaraTipos;
}
 
const buscarPorId = async (id: string): Promise<IAlvaraTipo> => {
    const session = await getServerSession(authOptions);
    const alvaraTipo = fetch(`${baseURL}alvara-tipo/buscar-por-id/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then( async (response) => {
        if (response.status === 401) signOut();
        if (response.status !== 200) return;
        return await response.json();
    })
    return alvaraTipo;
}

const criar = async (dataCreate: ICreateAlvaraTipo): Promise<IAlvaraTipo> => {
    const session = await getServerSession(authOptions);
    const alvaraTipo = fetch(`${baseURL}alvara-tipo/criar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`            
        },
        body: JSON.stringify(dataCreate)
    }).then( async (response) => {
        if (response.status === 401) signOut();
        if (response.status !== 201) return;
        return await response.json();
    });
    return alvaraTipo;
}

const atualizar = async (id: string, data: IUpdateAlvaraTipo): Promise<IAlvaraTipo> => {
    const session = await getServerSession(authOptions);
    const alvaraTipo = fetch(`${baseURL}alvara-tipo/atualizar/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }, body: JSON.stringify(data)
    }).then( async (response) => {
        if (response.status === 401) signOut();
        if (response.status !== 200) return;
        return await response.json();
    })
    return alvaraTipo;
}

const alterarStatus = async (id: string, status: number): Promise<IAlvaraTipo> => {
    const session = await getServerSession(authOptions);
    const alvaraTipo = fetch(`${baseURL}alvara-tipo/auterar-status/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }, body: JSON.stringify({id, status})
    }).then( async (response) => {
        if (response.status === 401) signOut();
        if (response.status !== 200) return;
        return await response.json();
    })
    return alvaraTipo;
}

export {
    alterarStatus,
    atualizar,
    buscarPorId,
    buscarTudo,
    criar,
    listaCompleta,
}