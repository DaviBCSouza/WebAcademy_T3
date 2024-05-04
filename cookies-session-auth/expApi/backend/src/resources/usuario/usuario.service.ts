import { PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcryptjs";
import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants";
import {
  CreateUsuarioDto,
  TipoUsuario,
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
  usuario: CreateUsuarioDto,
  tipoUsuario: TipoUsuario
): Promise<UsuarioDto> => {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS!);
  const salt = await genSalt(rounds);
  const senha = await hash(usuario.senha, salt);
  return await prisma.usuario.create({
    select: {
      id: true,
      nome: true,
      email: true,
      tipoUsuarioId: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      ...usuario,
      senha,
      tipoUsuarioId:
        tipoUsuario === "admin" ? TiposUsuarios.ADMIN : TiposUsuarios.CLIENT,
    },
  });
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
  const rounds = parseInt(process.env.BCRYPT_ROUNDS!);
  const salt = await genSalt(rounds);
  const senha = await hash(usuario.senha, salt);
  return await prisma.usuario.update({
    where: { id },
    data: {
      ...usuario,
      senha,
    },
  });
};

// Serviço para exclusão de um usuário
export const deleteUsuario = async (id: string): Promise<UsuarioDto> => {
  return await prisma.usuario.delete({ where: { id } });
};
