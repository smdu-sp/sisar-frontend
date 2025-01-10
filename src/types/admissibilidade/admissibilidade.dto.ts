import { IUsuario } from "@/types/usuario/usuario.dto"

export interface IInicial_Sqls {
  id: string
  inicial_id: number
  sql: string
  criado_em: Date
  alterado_em: Date
}

export interface IAlvaraTipo {
  id:                     string
  nome:                   string
  prazo_admissibilidade:  number
  prazo_analise_smul1:    number
  prazo_analise_smul2:    number
  prazo_analise_multi1:   number
  prazo_analise_multi2:   number
  status:                 boolean
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
  alvara_tipo?: IAlvaraTipo
  tipo_processo: number
  obs?: string
  status: number
  data_limiteSmul: Date
  iniciais_sqls?: IInicial_Sqls[]
  interfaces?: IInterfaces
  distribuicao?: IDistribuicao
}

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

export interface IAdmissibilidade {
  inicial_id: number;
  unidade_id?: string;
  data_envio?: Date;
  data_decisao_interlocutoria?: Date;
  parecer: boolean;
  subprefeitura_id?: string;
  categoria_id?: string;
  status: number;
  inicial?: IInicial;
  reconsiderado: boolean
  motivo: number
  criado_em?: Date
}

export interface ICreateAdmissibilidade {
  inicial_id: number;
  unidade_id?: string;
  data_envio?: Date;
  data_decisao_interlocutoria?: Date;
  parecer: boolean;
  subprefeitura_id?: string;
  categoria_id?: string;
  status?: number;
  inicial?: IInicial;
  reconsiderado: boolean
  motivo: string
  parecer_admissibilidade_id?: string
}

export interface IPaginadoAdmissibilidade {
  data: IAdmissibilidade[];
  total: number;
  pagina: number;
  limite: number;
}

export interface IPaginatedInicial {
  data: IAdmissibilidade[];
  total: number;
  pagina: number;
  limite: number;
}

export interface IUpdateAdmissibilidade extends Partial<ICreateAdmissibilidade> {}
