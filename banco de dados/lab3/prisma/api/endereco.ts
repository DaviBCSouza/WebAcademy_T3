import { fakerPT_BR } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAddress = async (clienteId: string): Promise<void> => {
  const rua = fakerPT_BR.location.street();
  const numero = fakerPT_BR.number.int({ min: 1, max: 1000 });
  const cep = parseInt(fakerPT_BR.location.zipCode());
  const cidade = fakerPT_BR.location.city();
  const estado = fakerPT_BR.location.state();
  const pais = fakerPT_BR.location.country();

  await prisma.endereco.create({
    data: {
      rua,
      numero,
      cep,
      cidade,
      estado,
      pais,
      cliente: { connect: { cpf: clienteId } },
    },
  });
};
