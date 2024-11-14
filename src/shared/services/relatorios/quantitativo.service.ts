"use server";

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

export interface unidade {
  id: string;
  nome: string;
  sigla: string;
  codigo: string;
  status: number;
}
[];

export interface IQuantitativoResponse {
  total: number;
  analise: number;
  inadmissiveis: number;
  admissiveis: number;
  data_gerado: string;
  em_analise: {
    smul: {
      quantidade: number;
      data: Array<{ nome: string; count: number }>;
    };
    graproem: {
      quantidade: number;
      data: Array<{ nome: string; count: number }>;
    };
    total_parcial: number;
  };
  deferidos: {
    smul: {
      quantidade: number;
      data: Array<{ nome: string; count: number }>;
    };
    graproem: {
      quantidade: number;
      data: Array<{ nome: string; count: number }>;
    };
    total_parcial: number;
  };
  indeferidos: {
    smul: {
      quantidade: number;
      data: Array<{ nome: string; count: number }>;
    };
    graproem: {
      quantidade: number;
      data: Array<{ nome: string; count: number }>;
    };
    total_parcial: number;
  };
}

const baseURL = process.env.API_URL || "http://localhost:3000/";

async function relatorioQuantitativo(): Promise<IQuantitativoResponse> {
  const session = await getServerSession(authOptions);
  const finalizacao = await fetch(`${baseURL}relatorio/ap/quantitativo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) signOut();
    return response.json();
  });
  return finalizacao;
}



export {relatorioQuantitativo};