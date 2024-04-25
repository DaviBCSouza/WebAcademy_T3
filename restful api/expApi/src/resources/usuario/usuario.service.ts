import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  CreateUsuarioDto,
  UpdateUsuarioDto,
  UsuarioDto,
} from "./usuario.types";

const prisma = new PrismaClient();

// Serviço para pegar todos os usuários
export const getAllUsuarios = async (): Promise<UsuarioDto[]> => {
  return await prisma.usuario.findMany();
};

// Serviço para criar um usuário
export const createUsuario = async (
  usuario: CreateUsuarioDto
): Promise<UsuarioDto> => {
  const salt = await bcrypt.genSalt(15);
  const hash = await bcrypt.hash(usuario.senha, salt);
  return await prisma.usuario.create({ data: { ...usuario, senha: hash } });
};

// Serviço para pegar um usuário pelo ID
export const getUsuarioId = async (id: string): Promise<UsuarioDto | null> => {
  return await prisma.usuario.findUnique({ where: { id } });
};

// Serviço para pegar um usuário pelo Email
export const getUsuarioEmail = async (
  email: string
): Promise<UsuarioDto | null> => {
  return await prisma.usuario.findUnique({ where: { email } });
};

// Serviço para atualizar um usuário
export const updateUsuario = async (
  id: string,
  usuario: UpdateUsuarioDto
): Promise<UsuarioDto> => {
  const salt = await bcrypt.genSalt(15);
  const hash = await bcrypt.hash(usuario.senha, salt);
  return await prisma.usuario.update({
    data: { ...usuario, senha: hash },
    where: { id },
  });
};

// Serviço para exclusão de um usuário
export const deleteUsuario = async (id: string): Promise<UsuarioDto> => {
  return await prisma.usuario.delete({ where: { id } });
};
