"use client";

import ListagemProdutos from "./components/ListagemProdutos";
import Navbar from "./components/Navbar";
import ResumoCarrinho from "./components/ResumoCarrinho";
import { mockProdutos } from "./mocks/produto";

export default function Produtos() {
  const produtos = mockProdutos;

  return (
    <>
      <Navbar />
      <main>
        <div className="container p-5 pb-0">
          <ResumoCarrinho quantidadeTotal={0} precoTotal={0} />
          <ListagemProdutos produtos={produtos} />
        </div>
      </main>
    </>
  );
}
