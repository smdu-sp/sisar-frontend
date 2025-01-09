export interface IUnidade {
    id: string;
    nome: string;
    sigla: string;
    codigo: string;
    status: number;
}

export interface IPaginadoUnidade {
    data: IUnidade[];
    total: number;
    pagina: number;
    limite: number;
    filtro: string;
}