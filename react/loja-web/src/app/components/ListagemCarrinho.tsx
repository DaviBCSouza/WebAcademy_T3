import ItemCarrinho from "./ItemCarrinho";

interface ListagemCarrinhoProps {
  items: ItemCarrinho[];
}

export default function ListagemCarrinho({
  items,
}: Readonly<ListagemCarrinhoProps>) {
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
          <ItemCarrinho key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
}
