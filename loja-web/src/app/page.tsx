"use client";

import ProductList from "./components/Home/ListagemProdutos";
import ItemSummary from "./components/ResumoCarrinho";
import { mockProducts } from "./mocks/produtos";

export default function Products() {
  const products = mockProducts;

  return (
    <main>
      <div className="container p-5">
        <ItemSummary />
        <ProductList products={products} />
      </div>
    </main>
  );
}
