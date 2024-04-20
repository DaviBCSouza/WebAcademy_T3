export interface Produto {
  id: number;
  categoria_id: number;
  modelo_id: number;
  nome: string;
  descricao?: string | null;
  fabricante: string;
  preco: number;
  estoque: number;
}
