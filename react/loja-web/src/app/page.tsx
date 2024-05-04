"use client";

import { useState } from "react";
import ListagemProdutos from "./components/ListagemProdutos";
import Navbar from "./components/Navbar";
import ResumoCarrinho from "./components/ResumoCarrinho";
import { mockProdutos } from "./mocks/produto";

export default function Produtos() {
  const produtos = mockProdutos;

  const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0);
  const [precoTotal, setPrecoTotal] = useState<number>(0);

  const adicionarAoCarrinho = (produto: Produto): void => {
    setQuantidadeTotal(quantidadeTotal + 1);
    setPrecoTotal(precoTotal + produto.preco);
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="container p-5 pb-0">
          <ResumoCarrinho
            quantidadeTotal={quantidadeTotal}
            precoTotal={precoTotal}
          />
          <ListagemProdutos
            produtos={produtos}
            adicionarAoCarrinho={adicionarAoCarrinho}
          />
        </div>
      </main>
    </>
  );
}
