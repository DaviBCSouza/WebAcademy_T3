"use client";

import ProtectedRouter from "@/app/components/ProtectedRouter";
import { useProductDetails } from "@/app/hooks/useProductDetails";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Product() {
  const { produto } = useParams();
  const { product, isPending, isError } = useProductDetails(produto as string);

  if (isPending)
    return (
      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>
              <h5>Carregando...</h5>
            </div>
          </div>
        </div>
      </main>
    );

  if (isError)
    return (
      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>
              <h5>Ocorreu um erro ao carregar o produto</h5>
            </div>
          </div>
        </div>
      </main>
    );

  if (!product)
    return (
      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>
              <h5>Este produto está indisponível no momento.</h5>
            </div>
          </div>
        </div>
      </main>
    );

  return (
    <ProtectedRouter>
      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>
              <h5 className="card-title mb-4 fw-bold">{product.nome}</h5>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
                <Image
                  key={product.id}
                  src={product.fotos[0].src}
                  alt={product.fotos[0].titulo}
                  width={300}
                  height={320}
                />
              </div>
              <p className="card-text fw-medium">
                Valor: R${Number(product.preco).toFixed(2)}
              </p>
              <p className="card-text fw-medium">
                Descrição: {product.descricao}
              </p>
              <p className="card-text fw-medium">
                Anunciado por: {product.usuario_id}
              </p>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRouter>
  );
}
