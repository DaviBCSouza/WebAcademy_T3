"use client";

import { useState } from "react";
import ListagemCarrinho from "../components/ListagemCarrinho";
import Navbar from "../components/Navbar";
import ResumoCarrinho from "../components/ResumoCarrinho";
import { mockItensCarrinho } from "../mocks/itemsCarrinho";

export default function Carrinho() {
  const [itensCarrinho, setItensCarrinho] =
    useState<ItemCarrinho[]>(mockItensCarrinho);

  const removerItemDoCarrinho = (id: number): void => {
    const novoCarrinho = itensCarrinho.filter((item) => item.id !== id);
    setItensCarrinho(novoCarrinho);
  };

  const quantidadeTotal = itensCarrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );
  const precoTotal = itensCarrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  return (
    <>
      <Navbar />

      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="row card-body">
              <h5 className="card-title mb-4 fw-light">
                Produtos selecionados
              </h5>
              <div className="table-responsive">
                <ListagemCarrinho
                  items={itensCarrinho}
                  removerItemDoCarrinho={removerItemDoCarrinho}
                />
              </div>
            </div>
          </div>

          <ResumoCarrinho
            quantidadeTotal={quantidadeTotal}
            precoTotal={precoTotal}
          />
        </div>
      </main>
    </>
  );
}
