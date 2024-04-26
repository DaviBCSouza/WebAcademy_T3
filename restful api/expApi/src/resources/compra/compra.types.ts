import { Compra } from "@prisma/client";

export type CreateCompraDto = Pick<Compra, "usuarioId">;
export type UpdateCompraDto = Pick<Compra, "usuarioId">;
