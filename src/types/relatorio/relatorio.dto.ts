import { IInicial } from "@/shared/services/admissibilidade.services";

export interface IAprovaRapidoQuantitativoResponse {
  total: number;
  analise: number;
  inadmissiveis: number;
  admissiveis: number;
  data_gerado: string;
  em_analise: {
    smul: {
      quantidade: number;
      data: { nome: string; count: number }[];
    };
    graproem: {
      quantidade: number;
      data: { nome: string; count: number }[];
    };
    total_parcial: number;
  };
  deferidos: {
    smul: {
      quantidade: number;
      data: { nome: string; count: number }[];
    };
    graproem: {
      quantidade: number;
      data: { nome: string; count: number }[];
    };
    total_parcial: number;
  };
  indeferidos: {
    smul: {
      quantidade: number;
      data: { nome: string; count: number }[];
    };
    graproem: {
      quantidade: number;
      data: { nome: string; count: number }[];
    };
    total_parcial: number;
  };
  "analise_admissiveis_dados": IInicial[],
  "inadmissiveis_dados": IInicial[],
  "em_analise_dados": IInicial[],
  "deferidos_dados": IInicial[],
  "indeferidos_dados": IInicial[],
  "via_ordinaria_dados": IInicial[]
}
