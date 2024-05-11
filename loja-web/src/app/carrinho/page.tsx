"use client";

import CartList from "../components/Cart/ListagemCarrinho";
import ItemSummary from "../components/ResumoCarrinho";

export default function Cart() {
  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="row card-body">
            <h5 className="card-title mb-4 fw-light">Produtos selecionados</h5>
            <div className="table-responsive">
              <CartList />
            </div>
          </div>
        </div>

        <ItemSummary />
      </div>
    </main>
  );
}
