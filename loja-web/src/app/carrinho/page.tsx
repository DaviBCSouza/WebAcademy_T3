"use client";

import { useState } from "react";
import CartList from "../components/Cart/ListagemCarrinho";
import ItemSummary from "../components/ResumoCarrinho";
import { mockCartItem } from "../mocks/itensCarrinho";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItem);

  const removeCartItem = (id: string): void => {
    const newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

  const totalAmount = cartItems.reduce((total, item) => total + item.amount, 0);

  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="row card-body">
            <h5 className="card-title mb-4 fw-light">Produtos selecionados</h5>
            <div className="table-responsive">
              <CartList items={cartItems} removeCartItem={removeCartItem} />
            </div>
          </div>
        </div>

        <ItemSummary totalPrice={totalPrice} totalAmount={totalAmount} />
      </div>
    </main>
  );
}
