import { fakerPT_BR } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = async (): Promise<string> => {
  const nome = fakerPT_BR.commerce.department();
  const novaCategoria = await prisma.categoria.create({
    data: { nome },
  });
  return novaCategoria.nome;
};
