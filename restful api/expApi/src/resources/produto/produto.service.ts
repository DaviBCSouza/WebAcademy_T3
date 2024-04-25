import { PrismaClient, Produto } from "@prisma/client";
import { CreateProdutoDto, UpdateProdutoDto } from "./produto.types";

const prisma = new PrismaClient();

// Serviço para verificar se o produto já existe
export const checkNomeIsAvaliable = async (
  nome: string,
  ignoreId?: string
): Promise<boolean> => {
  const produto = await prisma.produto.findUnique({ where: { nome } });
  if (!produto) return true;
  if (ignoreId && produto.id === ignoreId) return true;
  return false;
};

// Serviço para todos os produtos existentes
export const listProdutos = async (): Promise<Produto[]> => {
  return await prisma.produto.findMany();
};

// Serviço para criar um produto
export const createProduto = async (
  produto: CreateProdutoDto
): Promise<Produto> => {
  return await prisma.produto.create({ data: produto });
};

// Serviço para pegar um produto pelo ID
export const getProduto = async (id: string): Promise<Produto | null> => {
  return await prisma.produto.findUnique({ where: { id } });
};

// Serviço para atualizar um produto
export const updateProduto = async (
  id: string,
  produto: UpdateProdutoDto
): Promise<Produto> => {
  return await prisma.produto.update({ data: produto, where: { id } });
};

// Serviço para excluir um produto
export const deleteProduto = async (id: string): Promise<Produto> => {
  return await prisma.produto.delete({ where: { id } });
};
