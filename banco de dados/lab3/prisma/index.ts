import { PrismaClient } from "@prisma/client";
import { createCategory } from "./api/categoria";
import { createClient } from "./api/cliente";
import { createAddress } from "./api/endereco";
import { createProduct } from "./api/produto";

const prisma = new PrismaClient();

async function main() {
  try {
    // Adicionando 100 categorias
    for (let i = 0; i < 100; i++) {
      await createCategory();
    }
    console.log("Inseridas 100 categorias com sucesso.");

    // Adicionando 100 clientes
    for (let i = 0; i < 100; i++) {
      await createClient();
    }
    console.log("Inseridos 100 clientes com sucesso.");

    // Buscando todos os clientes
    const clientes = await prisma.cliente.findMany();

    // Adicionando 100 endereços para cada cliente
    for (const cliente of clientes) {
      for (let i = 0; i < 100; i++) {
        await createAddress(cliente.cpf);
      }
      console.log(
        `Inseridos 100 endereços para o cliente ${cliente.nome} com sucesso.`
      );
    }

    // Adicionando 100 produtos para cada categoria
    const categorias = await prisma.categoria.findMany();
    for (const categoria of categorias) {
      for (let i = 0; i < 100; i++) {
        await createProduct(categoria.id);
      }
      console.log(
        `Inseridos 100 produtos para a categoria ${categoria.nome} com sucesso.`
      );
    }
  } catch (error) {
    console.error("Erro:", error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
