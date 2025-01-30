import { IInicial } from "../admissibilidade/admissibilidade.dto";

export interface FinalizacaoPaginado {
    data: IFinalizacaoResponse[];
    total: number;
    pagina: number;
    limite: number;
}

export interface IFinalizacaoResponse {
    inicial: IInicial
    inicial_id: number
    data_apostilamento: Date
    data_conclusao: Date
    data_emissao: Date
    data_outorga: Date
    data_resposta: Date
    data_termo: Date
    num_alvara: string
    obs: string
    outorga: boolean
}

export interface IFinalizacao{
    inicial_id: number
    data_apostilamento: Date
    data_conclusao: Date
    data_emissao: Date
    data_outorga: Date
    data_resposta: Date
    data_termo: Date
    num_alvara: string
    obs: string
    outorga: boolean
}