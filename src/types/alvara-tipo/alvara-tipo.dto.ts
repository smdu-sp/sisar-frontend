export interface IAlvaraTipo {
  id:                             string
  nome:                           string
  status:                         number
  prazo_comunique_se:             number
  prazo_encaminhar_coord:         number
  prazo_admissibilidade_smul:     number
  reconsideracao_smul:            number
  reconsideracao_smul_tipo:       number
  analise_reconsideracao_smul:    number
  prazo_analise_smul1:            number
  prazo_analise_smul2:            number
  prazo_emissao_alvara_smul:      number
  prazo_admissibilidade_multi:    number
  reconsideracao_multi:           number
  reconsideracao_multi_tipo:      number
  analise_reconsideracao_multi:   number
  prazo_analise_multi1:           number
  prazo_analise_multi2:           number
  prazo_emissao_alvara_multi:     number
}

export interface IPaginadoAlvaraTipo {
  data: IAlvaraTipo[]
  total: number
  pagina: number
  limite: number
}

export interface auterarStatus {
  id: string
  status: number
}

export interface ICreateAlvaraTipo {
  nome:                           string
  prazo_admissibilidade_smul:     number
  reconsideracao_smul:            number
  reconsideracao_smul_tipo:       number
  analise_reconsideracao_smul:    number
  prazo_analise_smul1:            number
  prazo_analise_smul2:            number
  prazo_emissao_alvara_smul:      number
  prazo_admissibilidade_multi:    number
  reconsideracao_multi:           number
  reconsideracao_multi_tipo:      number
  analise_reconsideracao_multi:   number
  prazo_analise_multi1:           number
  prazo_analise_multi2:           number
  prazo_emissao_alvara_multi:     number
  prazo_comunique_se:             number
  prazo_encaminhar_coord:         number
  status:                         number
}

export interface IUpdateAlvaraTipo extends Partial<ICreateAlvaraTipo> {} {}
export interface IAlvaraTipo {
    id:                             string
    nome:                           string
    status:                         number
    prazo_comunique_se:             number
    prazo_encaminhar_coord:         number
    prazo_admissibilidade_smul:     number
    reconsideracao_smul:            number
    reconsideracao_smul_tipo:       number
    analise_reconsideracao_smul:    number
    prazo_analise_smul1:            number
    prazo_analise_smul2:            number
    prazo_emissao_alvara_smul:      number
    prazo_admissibilidade_multi:    number
    reconsideracao_multi:           number
    reconsideracao_multi_tipo:      number
    analise_reconsideracao_multi:   number
    prazo_analise_multi1:           number
    prazo_analise_multi2:           number
    prazo_emissao_alvara_multi:     number
}

export interface IPaginadoAlvaraTipo {
    data: IAlvaraTipo[]
    total: number
    pagina: number
    limite: number
}

export interface auterarStatus {
    id: string
    status: number
}

export interface IUpdateAlvaraTipo extends Partial<ICreateAlvaraTipo> {} {}

export interface ICreateAlvaraTipo {
    nome:                           string
    prazo_admissibilidade_smul:     number
    reconsideracao_smul:            number
    reconsideracao_smul_tipo:       number
    analise_reconsideracao_smul:    number
    prazo_analise_smul1:            number
    prazo_analise_smul2:            number
    prazo_emissao_alvara_smul:      number
    prazo_admissibilidade_multi:    number
    reconsideracao_multi:           number
    reconsideracao_multi_tipo:      number
    analise_reconsideracao_multi:   number
    prazo_analise_multi1:           number
    prazo_analise_multi2:           number
    prazo_emissao_alvara_multi:     number
    prazo_comunique_se:             number
    prazo_encaminhar_coord:         number
    status:                         number
}