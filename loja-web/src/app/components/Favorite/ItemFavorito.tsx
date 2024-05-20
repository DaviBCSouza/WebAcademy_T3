import { useFavoritesContext } from "@/app/contexts/FavoritosProvider";

interface IFavoriteItem {
  favoriteItem: Product;
}

export default function FavoriteItem({
  favoriteItem,
}: Readonly<IFavoriteItem>) {
  const { setFavorites } = useFavoritesContext();

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
