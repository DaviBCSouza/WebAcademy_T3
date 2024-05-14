import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import BootstrapClient from "./components/BootstrapClient";
import Navbar from "./components/Home/Navbar";
import { ReactQueryClientProvider } from "./components/ReactQueryClient";

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
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ReactQueryClientProvider>
          <Navbar />
          {children}
          <BootstrapClient />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
