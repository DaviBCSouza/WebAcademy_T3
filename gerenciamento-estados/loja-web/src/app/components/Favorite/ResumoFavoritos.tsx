import { useFavoritesProducts } from "@/app/contexts/FavoritosProvider";
import ProductCard from "../Home/CardProduto";

interface IFavoriteSummary {
  addCart: (product: Product) => void;
}

export default function FavoriteSummary({
  addCart,
}: Readonly<IFavoriteSummary>) {
  const favorites = useFavoritesProducts();

  return (
    <div className="mt-4">
      <h5 className="mb-4">Seus produtos favoritos:</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {favorites.map((produto) => (
          <ProductCard key={produto.id} product={produto} addCart={addCart} />
        ))}
      </div>
    </div>
  );
}
