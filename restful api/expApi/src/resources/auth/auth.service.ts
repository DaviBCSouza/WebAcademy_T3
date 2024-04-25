import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import TiposUsuarios from "../tipoUsuario/tipoUsuario.constants";
import { UsuarioDto } from "../usuario/usuario.types";
import { LoginDto } from "./auth.types";

const prisma = new PrismaClient();

// Serviço para verificar se as crendencias estão cogruentes
export const checkAuth = async (
  credenciais: LoginDto
): Promise<UsuarioDto | null> => {
  const { email, senha } = credenciais;
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) return null;
  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) return null;
  return usuario;
};

// Serviço para permitir somente adms em certas rotas
export const checkIsAdmin = async (id: string): Promise<boolean> => {
  const usuario = await prisma.usuario.findUnique({ where: { id: id } });
  if (!usuario) return false;
  return usuario.tipoUsuarioId === TiposUsuarios.ADMIN;
};

// Serviço para verificar se o usuário está logado
export const checkIsAuth = async (id: string): Promise<boolean> => {
  const usuario = await prisma.usuario.findUnique({ where: { id: id } });
  if (!usuario) return false;
  return true;
};
