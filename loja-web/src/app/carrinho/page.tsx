"use client";

import { useReducer } from "react";
import CartList from "../components/Cart/ListagemCarrinho";
import ProtectedRouter from "../components/ProtectedRouter";
import ItemSummary from "../components/ResumoCarrinho";
import { mockCartItem } from "../mocks/itensCarrinho";

type State = {
  cartItems: CartItem[];
};

export type Action =
  | { type: "aumentar_qtd"; id: string }
  | { type: "diminuir_qtd"; id: string }
  | { type: "remover"; id: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "aumentar_qtd": {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.id ? { ...item, amount: item.amount + 1 } : item
        ),
      };
    }
    case "diminuir_qtd": {
      const itemToDecrement = state.cartItems.find(
        (item) => item.id === action.id
      );
      if (!itemToDecrement || itemToDecrement.amount <= 0) {
        return state;
      }
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.id ? { ...item, amount: item.amount - 1 } : item
        ),
      };
    }
    case "remover": {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.id),
      };
    }
    default: {
      return state;
    }
  }
}

export default function Cart() {
  const [state, dispatch] = useReducer(reducer, { cartItems: mockCartItem });

  const totalPrice = state.cartItems.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

  const totalAmount = state.cartItems.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <ProtectedRouter>
      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="row card-body">
              <h5 className="card-title mb-4 fw-light">
                Produtos selecionados
              </h5>
              <div className="table-responsive">
                <CartList items={state.cartItems} dispatch={dispatch} />
              </div>
            </div>
          </div>

          <ItemSummary totalPrice={totalPrice} totalAmount={totalAmount} />
        </div>
      </main>
    </ProtectedRouter>
  );
}
