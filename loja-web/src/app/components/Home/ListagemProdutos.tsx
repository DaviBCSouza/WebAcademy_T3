import ProductCard from "./CardProduto";

interface IProductList {
  products: Product[];
}

export default function ProductList({ products }: Readonly<IProductList>) {
  return (
    <>
      <h5 className="mb-3">Produtos disponíveis:</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
