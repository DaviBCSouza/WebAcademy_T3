"use client";

import { useState } from "react";
import ProductList from "./components/Home/ListagemProdutos";
import ProtectedRouter from "./components/ProtectedRouter";
import ItemSummary from "./components/ResumoCarrinho";
import { FavoritesProvider } from "./contexts/FavoritosProvider";

export default function Products() {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const addCart = (product: Product): void => {
    setTotalPrice(totalPrice + parseFloat(product.preco));
    setTotalAmount(totalAmount + 1);
  };

  return (
    <ProtectedRouter>
      <main>
        <div className="container p-5">
          <ItemSummary totalPrice={totalPrice} totalAmount={totalAmount} />
          <FavoritesProvider>
            <ProductList addCart={addCart} />
          </FavoritesProvider>
        </div>
      </main>
    </ProtectedRouter>
  );
}
