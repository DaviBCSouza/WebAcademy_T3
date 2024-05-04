interface ItemCarrinhoProps {
  item: ItemCarrinho;
  removerItemDoCarrinho: (id: number) => void;
}

export default function ItemCarrinho({
  item,
  removerItemDoCarrinho,
}: Readonly<ItemCarrinhoProps>) {
  const valorTotalProduto = item.preco * item.quantidade;

  return (
    <tr key={item.id}>
      <td>{item.nome}</td>
      <td>R$ {item.preco}</td>
      <td>{item.quantidade}</td>

      <td>R$ {valorTotalProduto.toFixed(2)}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => removerItemDoCarrinho(item.id!)}
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
