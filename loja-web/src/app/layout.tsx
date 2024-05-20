import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import BootstrapClient from "./components/Home/BootstrapClient";
import Navbar from "./components/Home/Navbar";
import { ReactQueryClientProvider } from "./components/Home/ReactQueryClient";
import { FavoritesProvider } from "./contexts/FavoritosProvider";

export const metadata: Metadata = {
  title: "WA Loja",
  description: "Loja Online de Produtos Variados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ReactQueryClientProvider>
          <FavoritesProvider>
            <Navbar />
            {children}
            <BootstrapClient />
          </FavoritesProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
