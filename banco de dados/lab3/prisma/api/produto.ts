import { fakerPT_BR } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = async (id: number): Promise<void> => {
  const categoria = await prisma.categoria.findUnique({
    where: { id: id },
  });

  if (!categoria) {
    console.error(`Categoria não encontrada.`);
    return;
  }

  const modelo_id = fakerPT_BR.number.int({ min: 1000, max: 1000000 });
  const nome = fakerPT_BR.commerce.productName();
  const descricao = fakerPT_BR.lorem.sentence();
  const fabricante = fakerPT_BR.company.name();
  const preco = parseFloat(fakerPT_BR.commerce.price());
  const estoque = fakerPT_BR.number.int({ min: 10, max: 200 });

  await prisma.produto.create({
    data: {
      categoria_id: categoria.id,
      modelo_id,
      nome,
      descricao,
      fabricante,
      preco,
      estoque,
    },
  });
};
