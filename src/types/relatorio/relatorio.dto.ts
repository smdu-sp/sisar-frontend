import { ICreateAdmissibilidade } from "@/shared/services/admissibilidade.services";

export interface IAprovaRapidoQuantitativoResponse {
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
  "inadmissiveis_dados": any,
  "admissiveis_dados": any,
  "em_analise_dados": any
}
