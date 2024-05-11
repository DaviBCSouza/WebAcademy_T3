import CartItem from "./ItemCarrinho";

interface ICartList {
  items: CartItem[];
}

export default function CartList({ items }: Readonly<ICartList>) {
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
          <CartItem key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
}
