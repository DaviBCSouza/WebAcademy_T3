import Image from "next/image";
import { useRouter } from "next/navigation";

interface IProductCard {
  product: Product;
  addCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  addCart,
}: Readonly<IProductCard>) {
  const router = useRouter();

  const productDetails = (productName: string) => {
    router.push(`/produto/${productName}`);
  };

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={product.fotos[0].src}
          className="card-img-top"
          alt={product.fotos[0].titulo}
          width={300}
          height={320}
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
          <button
            className="btn btn-light d-block w-100 mt-2"
            type="button"
            onClick={() => productDetails(product.nome)}
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
