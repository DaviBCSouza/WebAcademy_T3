import { Dispatch, SetStateAction } from "react";

interface IFavoriteItem {
  favoriteItem: Product;
  setFavorites: Dispatch<SetStateAction<Product[]>>;
}

export default function FavoriteItem({
  favoriteItem,
  setFavorites,
}: IFavoriteItem) {
  const removeFavorite = (id: string) => {
    setFavorites((favorites) => favorites.filter((item) => item.id !== id));
  };

  return (
    <tr key={favoriteItem.id}>
      <td>{favoriteItem.nome}</td>
      <td>R$ {Number(favoriteItem.preco).toFixed(2)}</td>

      <td>
        <button
          onClick={() => removeFavorite(favoriteItem.id)}
          className="btn btn-danger btn-sm"
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
