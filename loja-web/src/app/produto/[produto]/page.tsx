"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Produto() {
  const { produto } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://ranekapi.origamid.dev/json/api/produto/${produto}`
        );
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar produtos: ", err);
      }
    };

    fetchData();
  }, [produto]);

  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>
            {loading ? (
              <h5 className="card-title mb-4 fw-bold">Carregando...</h5>
            ) : product ? (
              <>
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
              </>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
