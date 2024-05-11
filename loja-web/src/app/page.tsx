"use client";

import ProductList from "./components/Home/ListagemProdutos";
import ItemSummary from "./components/ResumoCarrinho";

export default function Products() {
  return (
    <main>
      <div className="container p-5">
        <ItemSummary />
        <ProductList />
      </div>
    </main>
  );
}
