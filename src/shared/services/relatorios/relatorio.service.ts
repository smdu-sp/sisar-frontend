"use server";

import { authOptions } from "@/shared/auth/authOptions";
import { IAprovaRapidoQuantitativoResponse } from "@/types/relatorio/relatorio.dto";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

export interface unidade {
  id: string;
  nome: string;
  sigla: string;
  codigo: string;
  status: number;
}[];

const baseURL = process.env.API_URL || "http://localhost:3000/";

export async function relatorioQuantitativo(mes: string, ano: string): Promise<IAprovaRapidoQuantitativoResponse> {
  const session = await getServerSession(authOptions);
  const finalizacao = await fetch(`${baseURL}relatorio/ar/quantitativo/${mes}/${ano}`, {
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

export async function getRelatorioReqRapido(mes: string, ano: string): Promise<IAprovaRapidoQuantitativoResponse> {
  const session = await getServerSession(authOptions);
  const finalizacao = await fetch(`${baseURL}relatorio/rr/quantitativo/${mes}/${ano}`, {
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
