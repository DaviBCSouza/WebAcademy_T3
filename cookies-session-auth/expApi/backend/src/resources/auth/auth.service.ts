import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { UsuarioDto } from "../usuario/usuario.types";
import { LoginDto } from "./auth.types";

const prisma = new PrismaClient();

// Serviço para verificar se as crendencias estão cogruentes
export const checkCredentials = async (
  credentials: LoginDto
): Promise<UsuarioDto | null> => {
  const usuario = await prisma.usuario.findUnique({
    where: { email: credentials.email },
  });
  if (!usuario) return null;
  const ok = await compare(credentials.senha, usuario.senha);
  if (!ok) return null;
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipoUsuarioId: usuario.tipoUsuarioId,
    createdAt: usuario.createdAt,
    updatedAt: usuario.updatedAt,
  };
};
