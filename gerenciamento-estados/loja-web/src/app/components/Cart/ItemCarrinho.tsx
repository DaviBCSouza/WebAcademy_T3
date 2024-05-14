import { Action } from "@/app/carrinho/page";
import { Dispatch } from "react";

interface ICartItem {
  item: CartItem;
  dispatch: Dispatch<Action>;
}

export default function CartItem({ item, dispatch }: Readonly<ICartItem>) {
  const productTotal: number = item.price * item.amount;

  return (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>R$ {item.price.toFixed(2)}</td>
      <td>
        <button
          className="btn btn-secondary btn-sm me-2"
          onClick={() => dispatch({ type: "diminuir_qtd", id: item.id })}
        >
          -
        </button>
        {item.amount}
        <button
          className="btn btn-secondary btn-sm ms-2"
          onClick={() => dispatch({ type: "aumentar_qtd", id: item.id })}
        >
          +
        </button>
      </td>
      <td>R$ {productTotal.toFixed(2)}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          type="button"
          onClick={() => dispatch({ type: "remover", id: item.id })}
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
