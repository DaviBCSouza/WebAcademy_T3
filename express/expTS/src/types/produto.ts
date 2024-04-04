export interface Produto {
  id: string;
  nome: string;
  preco: number;
  estoque: number;
}

export type CreateProdutoDTO = Pick<Produto, 'nome' | 'preco' | 'estoque'>;

export type UpdateProdutoDTO = Pick<Produto, 'nome' | 'preco' | 'estoque'>;
