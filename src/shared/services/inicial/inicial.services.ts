'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/auth/authOptions";
import { signOut } from "next-auth/react";
import { ICreateInicial, IDistribuicao, IInicial, IPaginatedInicial, IProcessosAvisos, IUpdateDistribuicao, IUpdateInicial } from "@/types/inicial/inicial.dto";

const baseURL = process.env.API_URL || 'http://localhost:3000/';

async function buscarTudoAnalise(pagina: number = 1, limite: number = 10): Promise<IPaginatedInicial> {
  const session = await getServerSession(authOptions);
  const subprefeituras = await fetch(`${baseURL}inicial/buscar-tudo-analise?pagina=${pagina}&limite=${limite}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.access_token}`
    }
  }).then((response) => {
    if (response.status === 401) signOut();
    return response.json();
  })
  return subprefeituras;
}

async function buscarTudo(pagina: number = 1, limite: number = 10, busca: string = '', status: string = "0"): Promise<IPaginatedInicial> {
  const session = await getServerSession(authOptions);
  const subprefeituras = await fetch(`${baseURL}inicial/buscar-tudo?pagina=${pagina}&limite=${limite}&busca=${busca}&status=${status}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.access_token}`
    }
  }).then((response) => {
    if (response.status === 401) signOut();
    return response.json();
  })
  return subprefeituras;
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
  const session = await getServerSession(authOptions);
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

const verificaSei = async (sei: string): Promise<IInicial | null> => {
  sei = sei.replaceAll(/\D/g, '');
  const session = await getServerSession(authOptions);
  const inicial = await fetch(`${baseURL}inicial/verifica-sei/${sei}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.access_token}`
    }
  }).then((response) => {
    // if (response.status === 401) Logout();
    return response.json();
  })
  return inicial;
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
  mudarAdministrativoResponsável,
  verificaSei,
  buscarTudoAnalise
}
