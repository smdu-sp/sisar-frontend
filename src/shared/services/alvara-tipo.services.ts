import { Api } from "../api/axios-config";

export interface IAlvaraTipo {
    id:                     string
    nome:                   string
    prazo_admissibilidade:  number
    prazo_analise_smul1:    number
    prazo_analise_smul2:    number
    prazo_analise_multi1:   number
    prazo_analise_multi2:   number
}

export interface IUpdateAlvaraTipo extends Partial<ICreateAlvaraTipo> {}

export interface ICreateAlvaraTipo {
    nome:                   string
    prazo_admissibilidade:  number
    prazo_analise_smul1:    number
    prazo_analise_smul2:    number
    prazo_analise_multi1:   number
    prazo_analise_multi2:   number
}

const entityUrl = '/alvara-tipo';

const findAll = async (): Promise<IAlvaraTipo[] | Error> => {
    throw new Error('Not implemented');
    try {
        const relative = `${entityUrl}`
        const { data } = await Api.get(relative);
        return data ? data : new Error('Erro ao buscar registros.');
    } catch (error: any) {
        return new Error(error.response ? error.response.data.message : error.request ? error.request : error.message || 'Erro ao buscar registros.');
    }
}
 
const findOne = async (id: string): Promise<IAlvaraTipo | Error> => {
    throw new Error('Not implemented');
    if (!id) throw new Error('Nenhum id informado.');
    try {
        const relative = `${entityUrl}/${id}`
        const { data } = await Api.get(relative);
        return data ? data : new Error('Erro ao buscar tipo de alvará pelo ID.');
    } catch (error: any) {
        return new Error(error.response ? error.response.data.message : error.request ? error.request : error.message || 'Erro ao buscar tipo de alvará pelo ID.');
    }
}

const create = async (dataCreate: ICreateAlvaraTipo): Promise<IAlvaraTipo | Error> => {
    throw new Error('Not implemented');
    try {
        const relative = `${entityUrl}`
        const { data } = await Api.post(relative, dataCreate);
        return data ? data : new Error('Erro ao criar o tipo de alvará.');
    } catch (error: any) {
        return new Error(error.response ? error.response.data.message : error.request ? error.request : error.message || 'Erro ao criar o tipo de alvará.');
    }
}

const update = async (id: string, dataUpdate: IUpdateAlvaraTipo): Promise<IAlvaraTipo | Error> => {
    throw new Error('Not implemented');
    if (!id) throw new Error('Nenhum id informado.');
    try {
        const relative = `${entityUrl}/${id}`
        const { data } = await Api.patch(relative, dataUpdate);
        return data ? data : new Error('Erro ao atualizar o tipo de alvará.');
    } catch (error: any) {
        return new Error(error.response ? error.response.data.message : error.request ? error.request : error.message || 'Erro ao atualizar o tipo de alvará.');
    }
}

export const AlvaraTipoService = {
    findAll,
    findOne,
    create,
    update
}