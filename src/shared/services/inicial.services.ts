'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/auth/authOptions";
import { IAlvaraTipo } from "./alvara-tipo.services";
import { signOut } from "next-auth/react";
import { IUsuario } from "./usuario.services";
import { IAdmissibilidade } from "./admissibilidade.services";
import { Interface } from "readline";

export interface IInicial_Sqls {
    id: string
    inicial_id: number
    sql: string
    criado_em: Date
    alterado_em: Date

}

export interface IInicial {
    id: number
    decreto: boolean
    sei: string
    tipo_requerimento: number
    requerimento: string
    aprova_digital?: string
    processo_fisico?: string
    data_protocolo: Date
    envio_admissibilidade?: Date
    alvara_tipo_id: string
    alvara_tipo: IAlvaraTipo
    tipo_processo: number
    pagamento: number
    obs?: string
    status: number
    requalifica_rapido: boolean
    associado_reforma: boolean
    data_limiteSmul: Date
    iniciais_sqls?: IInicial_Sqls[]
    interfaces?: IInterfaces
    distribuicao?: IDistribuicao
    admissibilidade?: IAdmissibilidade
}

export interface IDistribuicao {
    inicial_id: number
    tecnico_responsavel?: IUsuario
    tecnico_responsavel_id?: string
    administrativo_responsavel?: IUsuario
    administrativo_responsavel_id: string
    processo_relacionado_incomum?: string
    assunto_processo_relacionado_incomum?: string
    baixa_pagamento: boolean
    obs?: string
    criado_em: Date
    alterado_em: Date
}

export interface ICreateDistribuicao {
    inicial_id: number
    tecnico_responsavel_id: string
    administrativo_responsavel_id: string
    assunto_processo_relacionado_incomum?: string
    baixa_pagamento?: boolean
    obs?: string
}
export interface IUpdateDistribuicao extends Partial<ICreateDistribuicao> {}

export interface IInterfaces {
    inicial_id: number;
    interface_sehab: boolean
    num_sehab?: string
    interface_siurb: boolean
    num_siurb?: string
    interface_smc: boolean
    num_smc?: string
    interface_smt: boolean
    num_smt?: string
    interface_svma: boolean
    num_svma?: string
    criado_em: Date
    alterado_em: Date
}

export interface IUpdateInicial extends Partial<ICreateInicial> {}

export interface ICreateInterfaces {
    inicial_id?: number;
    interface_sehab?: boolean
    num_sehab?: string
    interface_siurb?: boolean
    num_siurb?: string
    interface_smc?: boolean
    num_smc?: string
    interface_smt?: boolean
    num_smt?: string
    interface_svma?: boolean
    num_svma?: string
}

export interface IProcessosAvisos {
    id: string;
    sei?: string;
    aprova_digital?: string;
}

export interface ICreateInicial {
    id?: number
    decreto: boolean
    sei: string
    tipo_requerimento: number
    requerimento: string
    aprova_digital?: string
    processo_fisico?: string
    data_protocolo: Date
    envio_admissibilidade?: Date
    alvara_tipo_id: string
    tipo_processo?: number
    obs?: string
    nums_sql?: string[]
    status?: number
    requalifica_rapido?: boolean
    associado_reforma?: boolean
    interfaces?: ICreateInterfaces
    data_limiteSmul: Date
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
        if (response.status === 401) signOut();
        return response.json();
    })
    return iniciais;
}

async function buscarPorMesAno(mes: string, ano: string){
    const session = await getServerSession(authOptions);
    const reunoes = await fetch(`${baseURL}inicial/buscar/${mes}/${ano}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        return response.json();
    })
    return reunoes;
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

const atualizar = async (id: number, dataUpdate: IUpdateInicial): Promise<IInicial> => {
    const session = await getServerSession(authOptions);
    const iniciais = await fetch(`${baseURL}inicial/atualizar/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(dataUpdate)
    }).then ((response) => {
        if(response.status === 401) signOut();
        if(response.status !== 200) return;
        return response.json();
    });
    return iniciais;
}


const adicionaSql = async (id: number, sql: string): Promise<IInicial> => {
    const session = await getServerSession(authOptions);
    const iniciais = await fetch(`${baseURL}inicial/adiciona-sql/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ sql })
    }).then ((response) => {
        if(response.status === 401) signOut();
        if(response.status !== 200) return;
        return response.json();
    });
    return iniciais;
}

const removeSql = async (inicial_id: string, sql: string): Promise<boolean> => {
    const session = await getServerSession(authOptions);
    const iniciais = await fetch(`${baseURL}inicial/remove-sql/${inicial_id}/${sql}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then (async (response) => {
        if(response.status === 401) signOut();
        if(response.status !== 200) return;
        const resp = await response.json();
        return resp;
    });
    return iniciais;
}

const atualizarDistribuicao = async (inicial_id: number, dataUpdate: IUpdateDistribuicao): Promise<IDistribuicao> => {
    console.log({ inicial_id, dataUpdate })
    const session = await getServerSession(authOptions);
    console.log(baseURL);
    const iniciais = await fetch(`${baseURL}distribuicao/atualizar/${inicial_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(dataUpdate)
    }).then ((response) => {
        const result = response.json();
        if(response.status === 401) signOut();
        if(response.status !== 200) return;
        return result;
    });
    return iniciais;
}

const mudarAdministrativoResponsável = async (inicial_id: number, dataUpdate: IUpdateDistribuicao): Promise<IDistribuicao> => {
    const session = await getServerSession(authOptions);
    console.log(baseURL);
    const iniciais = await fetch(`${baseURL}distribuicao/administrativo/atualizar/${inicial_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(dataUpdate)
    }).then ((response) => {
        const result = response.json();
        if(response.status === 401) signOut();
        if(response.status !== 200) return;
        return result;
    });
    return iniciais;
}

const mudarTecnicoResponsavel = async (inicial_id: number, dataUpdate: IUpdateDistribuicao): Promise<IDistribuicao> => {
    const session = await getServerSession(authOptions);
    console.log(baseURL);
    const iniciais = await fetch(`${baseURL}distribuicao/tecnico/atualizar/${inicial_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(dataUpdate)
    }).then ((response) => {
        const result = response.json();
        if(response.status === 401) signOut();
        if(response.status !== 200) return;
        return result;
    });
    return iniciais;
}

const processosAvisos = async (): Promise<IProcessosAvisos[]> => {
    const session = await getServerSession(authOptions);
    const iniciais = await fetch(`${baseURL}inicial/busca-processos`, {
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
    atualizar,
    atualizarDistribuicao,
    adicionaSql,
    buscarTudo,
    buscarPorId,
    criar,
    removeSql,
    buscarPorMesAno,
    processosAvisos,
    mudarTecnicoResponsavel,
    mudarAdministrativoResponsável
}
