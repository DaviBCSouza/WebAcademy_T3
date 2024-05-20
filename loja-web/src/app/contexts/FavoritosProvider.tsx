import { createContext, useMemo, useState } from "react";

interface FavoritesContextProps {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: [],
  setFavorites: () => {},
});

export function FavoritesProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const value = useMemo(() => ({ favorites, setFavorites }), [favorites]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
