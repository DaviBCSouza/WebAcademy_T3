import { Usuario } from "@prisma/client";

export type UsuarioDto = Usuario;
export type CreateUsuarioDto = Pick<
  Usuario,
  "tipoUsuarioId" | "nome" | "email" | "senha"
>;
export type UpdateUsuarioDto = Pick<
  Usuario,
  "tipoUsuarioId" | "nome" | "email" | "senha"
>;
