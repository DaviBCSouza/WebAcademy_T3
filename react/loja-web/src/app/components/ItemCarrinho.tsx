interface ItemCarrinhoProps {
  item: ItemCarrinho;
}

export default function ItemCarrinho({ item }: Readonly<ItemCarrinhoProps>) {
  const valorTotalProduto = item.preco * item.quantidade;

  return (
    <tr key={item.id}>
      <td>{item.nome}</td>
      <td>R$ {item.preco}</td>
      <td>{item.quantidade}</td>

      <td>R$ {valorTotalProduto.toFixed(2)}</td>
      <td>
        <button className="btn btn-danger btn-sm">Remover</button>
      </td>
    </tr>
  );
}
