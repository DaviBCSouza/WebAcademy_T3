import { Dispatch, SetStateAction } from "react";
import FavoriteItem from "./ItemFavorito";

interface IFavoriteList {
  favoriteProducts: Product[];
  setFavorites: Dispatch<SetStateAction<Product[]>>;
}

export default function FavoriteList({
  favoriteProducts,
  setFavorites,
}: IFavoriteList) {
  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Lista de favoritos:</h5>
        <div className="table-responsive">
          <table className="table ">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {favoriteProducts.map((item) => (
                <FavoriteItem
                  key={item.id}
                  favoriteItem={item}
                  setFavorites={setFavorites}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
