"use client";

import { useEffect, useState } from "react";
import ProductList from "./components/Home/ListagemProdutos";
import ItemSummary from "./components/ResumoCarrinho";

export default function Products() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ranekapi.origamid.dev/json/api/produto"
        );
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Erro ao buscar produtos: ", err);
      }
    };

    fetchData();
  }, []);

  const addCart = (product: Product): void => {
    setTotalPrice(totalPrice + parseFloat(product.preco));
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
