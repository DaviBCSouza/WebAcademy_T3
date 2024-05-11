import Image from "next/image";

interface IProductCard {
  product: Product;
  addCart: (product: Product) => void;
}

export default function ProductCard({ product, addCart }: IProductCard) {
  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={product.fotos[0].src}
          className="card-img-top"
          alt={product.fotos[0].titulo}
          width={300}
          height={320}
          style={{ height: "auto" }}
          priority
        />

        <div className="card-body bg-light">
          <h5 className="card-title">{product.nome}</h5>
          <p className="card-text text-secondary">R$ {product.preco}</p>
          <button
            className="btn btn-dark d-block w-100"
            type="button"
            onClick={() => addCart(product)}
          >
            Adicionar no carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
