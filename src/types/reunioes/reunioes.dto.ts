export interface IReunioes {
    mes: string;
    ano: string;
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
    tipo_processo: number
    pagamento: number
    obs?: string
    status: number
}

export interface IProcesso {
    id: string;
    data_processo: string;
    inicial: IInicial[];
}