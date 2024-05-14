import { Action } from "@/app/carrinho/page";
import { Dispatch } from "react";
import CartItem from "./ItemCarrinho";

interface ICartList {
  items: CartItem[];
  dispatch: Dispatch<Action>;
}

export default function CartList({ items, dispatch }: Readonly<ICartList>) {
  return (
    <table className="table ">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Valor Unitário</th>
          <th>Quantidade</th>
          <th>Valor Total</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <CartItem key={item.id} item={item} dispatch={dispatch} />
        ))}
      </tbody>
    </table>
  );
}
