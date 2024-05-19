"use client";

import { createContext, useState } from "react";
import ProductList from "./components/Home/ListagemProdutos";
import ProtectedRouter from "./components/ProtectedRouter";
import ItemSummary from "./components/ResumoCarrinho";

interface FavoritesContextProps {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: [],
  setFavorites: () => {},
});

export default function Products() {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addCart = (product: Product): void => {
    setTotalPrice(totalPrice + parseFloat(product.preco));
    setTotalAmount(totalAmount + 1);
  };

  const value = { favorites, setFavorites };

  return (
    <ProtectedRouter>
      <main>
        <div className="container p-5">
          <ItemSummary totalPrice={totalPrice} totalAmount={totalAmount} />
          <FavoritesContext.Provider value={value}>
            <ProductList addCart={addCart} />
          </FavoritesContext.Provider>
        </div>
      </main>
    </ProtectedRouter>
  );
}
