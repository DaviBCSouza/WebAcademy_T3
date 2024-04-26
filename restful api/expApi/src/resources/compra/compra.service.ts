import { Compra, PrismaClient } from "@prisma/client";
import { CreateCompraDto, UpdateCompraDto } from "./compra.types";

const prisma = new PrismaClient();

// Serviço para listar todas as compras
export const listCompras = async (): Promise<Compra[]> => {
  return await prisma.compra.findMany();
};

// Serviço para criar uma compra
export const createCompra = async (
  compra: CreateCompraDto
): Promise<Compra> => {
  return await prisma.compra.create({ data: compra });
};

// Serviço para pegar uma compra
export const getCompra = async (id: string): Promise<Compra | null> => {
  return await prisma.compra.findUnique({ where: { id } });
};

// Serviço para atualizar uma compra
export const updateCompra = async (
  id: string,
  compra: UpdateCompraDto
): Promise<Compra> => {
  return await prisma.compra.update({ data: compra, where: { id } });
};

// Serviço para excluir uma compra
export const deleteCompra = async (id: string): Promise<Compra> => {
  return await prisma.compra.delete({ where: { id } });
};

// Serviço para concluir uma compra
export const concluirCompra = async (
  usuarioId: string,
  carrinho: any
): Promise<Compra> => {
  // Verifica se o usuário existe
  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  // Inicia uma transação para garantir consistência entre a atualização do estoque e a criação da compra
  const transaction = await prisma.$transaction(async (prisma) => {
    // Salva os produtos do carrinho no banco de dados e atualizar o estoque
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

      // Cria o registro de compraItem
      compraItens.push({
        produtoId,
        quantidade: Number(quantidade),
      });

      // Atualiza o estoque do produto
      await prisma.produto.update({
        where: { id: produtoId },
        data: { estoque: produto.estoque - Number(quantidade) },
      });
    }

    // Cria a compra e os itens associados
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
