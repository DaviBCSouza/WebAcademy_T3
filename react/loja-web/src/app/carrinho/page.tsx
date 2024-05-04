"use client";

import ListagemCarrinho from "../components/ListagemCarrinho";
import Navbar from "../components/Navbar";
import ResumoCarrinho from "../components/ResumoCarrinho";
import { mockItensCarrinho } from "../mocks/itemsCarrinho";

export default function Carrinho() {
  const items = mockItensCarrinho;

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
                <ListagemCarrinho items={items} />
              </div>
            </div>
          </div>

          <ResumoCarrinho quantidadeTotal={0} precoTotal={0} />
        </div>
      </main>
    </>
  );
}
