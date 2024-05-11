interface ICartItem {
  item: CartItem;
  removeCartItem: (id: string) => void;
}

export default function CartItem({
  item,
  removeCartItem,
}: Readonly<ICartItem>) {
  const productTotal: number = item.price * item.amount;

  return (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>R$ {item.price.toFixed(2)}</td>
      <td>{item.amount}</td>

      <td>R$ {productTotal.toFixed(2)}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          type="button"
          onClick={() => removeCartItem(item.id)}
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
