import { useProductsList } from "@/app/hooks/useProductsList";
import FavoriteSummary from "../Favorite/ResumoFavoritos";
import ProductCard from "./CardProduto";

interface IProductList {
  addCart: (product: Product) => void;
}

export default function ProductList({ addCart }: Readonly<IProductList>) {
  const { products, isPending, isError } = useProductsList();

  if (isPending) return <h5>Carregando...</h5>;

  if (isError) return <h5>Ocorreu um erro ao carregar os produtos.</h5>;

  if (!products) return <h5>Não há produtos disponíveis no momento.</h5>;

  return (
    <>
      <h5 className="mb-3">Produtos disponíveis:</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addCart={addCart} />
        ))}
      </div>

      <FavoriteSummary addCart={addCart} />
    </>
  );
}
