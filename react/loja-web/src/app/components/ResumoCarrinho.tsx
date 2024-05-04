interface ResumoCarrinhoProps {
  quantidadeTotal: number;
  precoTotal: number;
}

export default function ResumoCarrinho({
  quantidadeTotal,
  precoTotal,
}: Readonly<ResumoCarrinhoProps>) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4 fw-light">Resumo do Carrinho</h5>
        <p className="card-text fw-medium">
          Quantidade total: {quantidadeTotal}
        </p>
        <p className="card-text fw-medium">Valor total: R${precoTotal}</p>
      </div>
    </div>
  );
}
