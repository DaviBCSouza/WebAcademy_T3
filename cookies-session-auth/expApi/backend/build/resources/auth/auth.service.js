"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCredentials = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const prisma = new client_1.PrismaClient();
// Serviço para verificar se as crendencias estão cogruentes
const checkCredentials = async (credentials) => {
    const usuario = await prisma.usuario.findUnique({
        where: { email: credentials.email },
    });
    if (!usuario)
        return null;
    const ok = await (0, bcryptjs_1.compare)(credentials.senha, usuario.senha);
    if (!ok)
        return null;
    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipoUsuarioId: usuario.tipoUsuarioId,
        createdAt: usuario.createdAt,
        updatedAt: usuario.updatedAt,
    };
};
exports.checkCredentials = checkCredentials;
