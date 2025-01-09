export interface IParecer {
  id: string;
  parecer: string;
  status: number;
}

export interface ICriarParecer {
  parecer: string;
  status?: number;
}

export interface IPaginadoParecer {
  data: IParecer[];
  total: number;
  pagina: number;
  limite: number;
}
