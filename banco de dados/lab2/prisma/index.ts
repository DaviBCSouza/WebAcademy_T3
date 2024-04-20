import { PrismaClient } from "@prisma/client";
import { createClient } from "./api/cliente";

const prisma = new PrismaClient();

// Adicionado 100 clientes ao Banco de Dados
async function main() {
  try {
    for (let i = 0; i < 100; i++) {
      await createClient();
    }
    console.log("Inseridos 100 clientes com sucesso.");
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
