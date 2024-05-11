"use client";

import { useState } from "react";
import ProductList from "./components/Home/ListagemProdutos";
import ItemSummary from "./components/ResumoCarrinho";
import { mockProducts } from "./mocks/produtos";

export default function Products() {
  const products = mockProducts;

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const addCart = (product: Product): void => {
    setTotalPrice(totalPrice + parseFloat(product.price));
    setTotalAmount(totalAmount + 1);
  };

  return (
    <main>
      <div className="container p-5">
        <ItemSummary totalPrice={totalPrice} totalAmount={totalAmount} />
        <ProductList products={products} addCart={addCart} />
      </div>
    </main>
  );
}
