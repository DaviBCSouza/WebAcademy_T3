import ItemCarrinho from "./ItemCarrinho";

interface ListagemCarrinhoProps {
  items: ItemCarrinho[];
  removerItemDoCarrinho: (id: number) => void;
}

export default function ListagemCarrinho({
  items,
  removerItemDoCarrinho,
}: ListagemCarrinhoProps) {
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
          <ItemCarrinho
            key={item.id}
            item={item}
            removerItemDoCarrinho={removerItemDoCarrinho}
          />
        ))}
      </tbody>
    </table>
  );
}
