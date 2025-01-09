import { IUnidade } from "@/shared/services/unidade.services";

export interface IUsuario {
  id: string;
  nome: string;
  email: string;
  login: string;
  permissao: string;
  cargo: string;
  status: number;
  criado_em: Date;
  atualizado_em: Date;
  unidade_id?: string;
  ferias?: IFerias[];
  substitutos?: ISubstituto[];
  usuarios?: ISubstituto[];
  unidade?: IUnidade;
}

export interface IFerias {
  id: string;
  inicio: Date;
  final: Date;
  usuario_id: string;
  usuario?: IUsuario;
  criado_em: Date;
  atualizado_em: Date;
}

export interface ISubstituto {
  id: string;
  usuario_id: Date;
  usuario?: IUsuario;
  substituto_id: string;
  substituto?: IUsuario;
}

export interface IAddFeriasUsuario {
  inicio: Date;
  final: Date;
}

export interface ICreateUsuario {
  nome: string;
  email: string;
  login: string;
  permissao: string;
  cargo: string;
  unidade_id?: string;
}

export interface IUpdateUsuario {
  id?: string;
  permissao?: string;
  cargo?: string;
  status?: number;
  unidade_id?: string;
}

export interface IPaginadoUsuario {
  data: IUsuario[];
  total: number;
  pagina: number;
  limite: number;
}
