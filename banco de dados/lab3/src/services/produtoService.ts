import { PrismaClient } from "@prisma/client";
import { CreateProdutoDto } from "../models/dto/CreateProdutoDto";
import { UpdateProdutoDto } from "../models/dto/UpdateProdutoDto";
import { Produto } from "../models/produto";

const prisma = new PrismaClient();

export const listProdutos = async (): Promise<Produto[]> => {
  try {
    return await prisma.produto.findMany();
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    throw error;
  }
};

export const createProduto = async (
  produto: CreateProdutoDto
): Promise<Produto> => {
  try {
    return await prisma.produto.create({
      data: produto,
    });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
};

export const getProduto = async (id: number): Promise<Produto | null> => {
  try {
    return await prisma.produto.findUnique({ where: { id } });
  } catch (error) {
    console.error("Erro ao obter produto:", error);
    throw error;
  }
};

export const updateProduto = async (
  id: number,
  novoProduto: UpdateProdutoDto
): Promise<Produto> => {
  try {
    return await prisma.produto.update({
      where: { id },
      data: novoProduto,
    });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
};

export const deleteProduto = async (id: number): Promise<boolean> => {
  try {
    await prisma.produto.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    throw error;
  }
};
