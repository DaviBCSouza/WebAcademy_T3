import { Compra, PrismaClient } from "@prisma/client";
import { CreateCompraDto, UpdateCompraDto } from "./compra.types";

const prisma = new PrismaClient();

export const listCompras = async (): Promise<Compra[]> => {
  return await prisma.compra.findMany();
};

export const createCompra = async (
  compra: CreateCompraDto
): Promise<Compra> => {
  return await prisma.compra.create({ data: compra });
};

export const getCompra = async (id: string): Promise<Compra | null> => {
  return await prisma.compra.findUnique({ where: { id } });
};

export const updateCompra = async (
  id: string,
  compra: UpdateCompraDto
): Promise<Compra> => {
  return await prisma.compra.update({ data: compra, where: { id } });
};

export const deleteCompra = async (id: string): Promise<Compra> => {
  return await prisma.compra.delete({ where: { id } });
};

export const concluirCompra = async (
  usuarioId: string,
  carrinho: any
): Promise<Compra> => {
  // Verificar se o usuário existe
  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  // Iniciar uma transação para garantir consistência entre a atualização do estoque e a criação da compra
  const transaction = await prisma.$transaction(async (prisma) => {
    // Salvar os produtos do carrinho no banco de dados e atualizar o estoque
    const compraItens = [];

    for (const [produtoId, quantidade] of Object.entries(carrinho)) {
      const produto = await prisma.produto.findUnique({
        where: { id: produtoId },
      });

      if (!produto) {
        throw new Error(`Produto com ID ${produtoId} não encontrado`);
      }

      if (produto.estoque < Number(quantidade)) {
        throw new Error(`Estoque insuficiente para o produto ${produto.nome}`);
      }

      // Criar o registro de compraItem
      compraItens.push({
        produtoId,
        quantidade: Number(quantidade),
      });

      // Atualizar o estoque do produto
      await prisma.produto.update({
        where: { id: produtoId },
        data: { estoque: produto.estoque - Number(quantidade) },
      });
    }

    // Criar a compra e os itens associados
    const compra = await prisma.compra.create({
      data: {
        usuario: { connect: { id: usuarioId } },
        compraItens: {
          create: compraItens,
        },
      },
      include: { compraItens: true },
    });

    return compra;
  });

  return transaction;
};
