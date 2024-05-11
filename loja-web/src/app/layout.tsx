import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import BootstrapClient from "./components/BootstrapClient";
import Navbar from "./components/Home/Navbar";

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
        <Navbar />
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
