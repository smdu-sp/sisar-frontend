import { Api } from "../api/axios-config";

export interface IInicial {
    id: number
    decreto: boolean
    sei: string
    num_sql: string
    tipo_requerimento: string
    requerimento: string
    aprova_digital: string | null
    processo_fisico: string | null
    data_protocolo: Date
    envio_admissibilidade: Date | null
    tipo_alvara: string
    tipo_processo: string
    obs: string | null
    status: string    
}

export interface IUpdateInicial extends Partial<ICreateInicial> {}

export interface ICreateInicial {
    id: number
    decreto: boolean
    sei: string
    num_sql: string
    tipo_requerimento: string
    requerimento: string
    aprova_digital: string | null
    processo_fisico: string | null
    data_protocolo: Date
    envio_admissibilidade: Date | null
    tipo_alvara: string
    tipo_processo: string
    obs: string | null
    status: string
}

export interface IPaginatedInicial {
    data: IInicial[];
    totalCount: number;
}

const entityUrl = '/iniciais';

const findAll = async (
    page: number = 1, 
    limit: number = 10,
): Promise<IPaginatedInicial | Error> => {
    try {
        const relative = `${entityUrl}?page=${page}&limit=${limit}`
        const { data } = await Api.get(relative);
        return data ? data : new Error('Erro ao buscar categorias.');
    } catch (error: any) {
        return new Error(error.response ? error.response.data.message : error.request ? error.request : error.message || 'Erro ao buscar iniciais.');
    }
}
 
const findOne = async (id: string): Promise<IInicial | Error> => {
    if (!id) throw new Error('Nenhum id informado.');
    try {
        const relative = `${entityUrl}/${id}`
        const { data } = await Api.get(relative);
        return data ? data : new Error('Erro ao buscar processo pelo ID.');
    } catch (error: any) {
        return new Error(error.response ? error.response.data.message : error.request ? error.request : error.message || 'Erro ao buscar processo pelo ID.');
    }
}

const create = async (dataCreate: IUpdateInicial): Promise<IInicial | Error> => {
    try {
        const relative = `${entityUrl}`
        const { data } = await Api.post(relative, dataCreate);
        return data ? data : new Error('Erro ao criar o processo.');
    } catch (error: any) {
        return new Error(error.response ? error.response.data.message : error.request ? error.request : error.message || 'Erro ao criar o processo.');
    }
}

const update = async (id: string, dataUpdate: IUpdateInicial): Promise<IInicial | Error> => {
    if (!id) throw new Error('Nenhum id informado.');
    try {
        const relative = `${entityUrl}/${id}`
        const { data } = await Api.patch(relative, dataUpdate);
        return data ? data : new Error('Erro ao atualizar o processo.');
    } catch (error: any) {
        return new Error(error.response ? error.response.data.message : error.request ? error.request : error.message || 'Erro ao atualizar o processo.');
    }
}

export const IniciaisService = {
    findAll,
    findOne,
    create,
    update,
    // deactivate,
}