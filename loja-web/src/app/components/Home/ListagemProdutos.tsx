import ProductCard from "./CardProduto";

export default function ProductList() {
  return (
    <>
      <h5 className="mb-3">Produtos disponíveis:</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        <ProductCard />
      </div>
    </>
  );
}
