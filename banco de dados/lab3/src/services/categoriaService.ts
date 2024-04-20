import { PrismaClient } from "@prisma/client";
import { Categoria } from "../models/categoria";
import { CreateCategoriaDto } from "../models/dto/CreateCategoriaDto";
import { UpdateCategoriaDto } from "../models/dto/UpdateCategoriaDto";

const prisma = new PrismaClient();

export const listCategorias = async (): Promise<Categoria[]> => {
  return await prisma.categoria.findMany();
};

export const createCategoria = async (
  categoria: CreateCategoriaDto
): Promise<Categoria> => {
  return await prisma.categoria.create({ data: categoria });
};

export const getCategoria = async (id: number): Promise<Categoria | null> => {
  return await prisma.categoria.findUnique({ where: { id } });
};

export const updateCategoria = async (
  id: number,
  novaCategoria: UpdateCategoriaDto
): Promise<Categoria> => {
  return await prisma.categoria.update({ where: { id }, data: novaCategoria });
};

export const deleteCategoria = async (id: number): Promise<Categoria> => {
  return await prisma.categoria.delete({ where: { id } });
};
