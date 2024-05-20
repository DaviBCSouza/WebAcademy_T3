import { useFavoritesProducts } from "@/app/contexts/FavoritosProvider";
import FavoriteItem from "./ItemFavorito";

export default function FavoriteList() {
  const favorites = useFavoritesProducts();

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
              {favorites.map((item) => (
                <FavoriteItem key={item.id} favoriteItem={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
