export interface ISubprefeitura {
    id: string;
    nome: string;
    sigla: string;
    status: number;
}

export interface IPaginadoSubprefeitura {
    data: ISubprefeitura[];
    total: number;
    pagina: number;
    limite: number;
}