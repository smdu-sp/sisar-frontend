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
  "analise_admissiveis_dados": any[],
  "inadmissiveis_dados": any[],
  "em_analise_dados": any[],
  "deferidos_dados": any[],
  "indeferidos_dados": any[],
  "via_ordinaria_dados": any[]
}
