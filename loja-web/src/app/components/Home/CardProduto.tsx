import Image from "next/image";

interface IProductCard {
  product: Product;
}

export default function ProductCard({ product }: Readonly<IProductCard>) {
  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={product.photos[0].src}
          className="card-img-top"
          alt={product.photos[0].title}
          width={300}
          height={320}
          style={{ height: "auto" }}
          priority
        />

        <div className="card-body bg-light">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-secondary">R$ {product.price}</p>
          <button className="btn btn-dark d-block w-100" type="button">
            Adicionar no carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
