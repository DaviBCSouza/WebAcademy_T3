"use client";

import { useState } from "react";
import FavoriteList from "../components/Favorite/ListagemFavoritos";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Product[] | []>([]);

  return (
    <main>
      <div className="container p-5">
        <FavoriteList
          favoriteProducts={favorites}
          setFavorites={setFavorites}
        />
      </div>
    </main>
  );
}
