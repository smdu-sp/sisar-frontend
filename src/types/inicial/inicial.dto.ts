import { IAdmissibilidade, IAlvaraTipo } from "../admissibilidade/admissibilidade.dto"
import { IUsuario } from "../usuario/usuario.dto"

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
  alterado_em: Date
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

export interface IUpdateDistribuicao extends Partial<ICreateDistribuicao> {}

export interface IUpdateInicial extends Partial<ICreateInicial> {}
