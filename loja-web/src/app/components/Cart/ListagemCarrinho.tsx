import CartItem from "./ItemCarrinho";

export default function CartList() {
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
        <CartItem />
      </tbody>
    </table>
  );
}
