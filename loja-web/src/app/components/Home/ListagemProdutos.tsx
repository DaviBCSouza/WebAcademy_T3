import ProductCard from "./CardProduto";

interface IProductList {
  products: Product[] | null;
  addCart: (product: Product) => void;
}

export default function ProductList({ products, addCart }: IProductList) {
  return (
    <>
      <h5 className="mb-3">Produtos disponíveis:</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {products ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} addCart={addCart} />
          ))
        ) : (
          <h6>Carregando...</h6>
        )}
      </div>
    </>
  );
}
