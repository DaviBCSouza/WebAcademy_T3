import { Dispatch, SetStateAction } from "react";
import ProductCard from "../Home/CardProduto";

interface IFavoriteSummary {
  favorites: Product[];
  addCart: (product: Product) => void;
  setFavorites: Dispatch<SetStateAction<Product[]>>;
}

export default function FavoriteSummary({
  favorites,
  addCart,
  setFavorites,
}: IFavoriteSummary) {
  return (
    <div className="mt-4">
      <h5 className="mb-4">Seus produtos favoritos:</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {favorites.map((produto) => (
          <ProductCard
            key={produto.id}
            product={produto}
            favorites={favorites}
            addCart={addCart}
            setFavorites={setFavorites}
          />
        ))}
      </div>
    </div>
  );
}
