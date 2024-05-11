export default function CartItem() {
  const productTotal = (unitPrice: number, amount: number): number =>
    unitPrice * amount;

  return (
    <tr key="1">
      <td>Notebook 1</td>
      <td>R$ {(1500).toFixed(2)}</td>
      <td>2</td>

      <td>R$ {productTotal(1500, 2).toFixed(2)}</td>
      <td>
        <button className="btn btn-danger btn-sm">Remover</button>
      </td>
    </tr>
  );
}
