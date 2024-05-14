interface Photo {
  titulo: string;
  src: string;
}

interface Product {
  id: string;
  fotos: Photo[];
  nome: string;
  preco: string;
  descricao: string;
  vendido: string;
  usuario_id: string;
}
