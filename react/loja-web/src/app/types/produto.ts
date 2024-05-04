interface Foto {
  titulo: string;
  src: string;
}

interface Produto {
  id: string;
  fotos: Foto[];
  nome: string;
  preco: number;
  descricao: string;
  vendido: boolean;
  usuario_id: string;
}
