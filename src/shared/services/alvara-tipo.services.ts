'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export interface IAlvaraTipo {
    id:                     string
    nome:                   string
    prazo_admissibilidade:  number
    prazo_analise_smul1:    number
    prazo_analise_smul2:    number
    prazo_analise_multi1:   number
    prazo_analise_multi2:   number
}

export interface IPaginadoAlvaraTipo {
    data: IAlvaraTipo[]
    total: number
    pagina: number
    limite: number
}

export interface IUpdateAlvaraTipo extends Partial<ICreateAlvaraTipo> {}

export interface ICreateAlvaraTipo {
    nome:                   string
    prazo_admissibilidade:  number
    prazo_analise_smul1:    number
    prazo_analise_smul2:    number
    prazo_analise_multi1:   number
    prazo_analise_multi2:   number
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

const buscarTudo = async (): Promise<IPaginadoAlvaraTipo> => {
    const session = await getServerSession(authOptions);
    const alvaraTipos = await fetch(`${baseURL}alvara-tipo/buscar-tudo`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        return response.json();
    })
    console.log(alvaraTipos);
    return alvaraTipos;
}
 
const findOne = async (id: string): Promise<IAlvaraTipo | Error> => {
    throw new Error('Not implemented');
}

const create = async (dataCreate: ICreateAlvaraTipo): Promise<IAlvaraTipo | Error> => {
    throw new Error('Not implemented');
}

const update = async (id: string, dataUpdate: IUpdateAlvaraTipo): Promise<IAlvaraTipo | Error> => {
    throw new Error('Not implemented');
}

export {
    buscarTudo,
    findOne,
    create,
    update
}