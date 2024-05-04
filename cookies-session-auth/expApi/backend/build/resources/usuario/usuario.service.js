"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.updateUsuario = exports.getUsuarioEmail = exports.getUsuarioId = exports.createUsuario = exports.getAllUsuarios = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const tipoUsuario_constants_1 = require("../tipoUsuario/tipoUsuario.constants");
const prisma = new client_1.PrismaClient();
// Serviço para pegar todos os usuários
const getAllUsuarios = async () => {
    return await prisma.usuario.findMany();
};
exports.getAllUsuarios = getAllUsuarios;
// Serviço para criar um usuário
const createUsuario = async (usuario, tipoUsuario) => {
    const rounds = parseInt(process.env.BCRYPT_ROUNDS);
    const salt = await (0, bcryptjs_1.genSalt)(rounds);
    const senha = await (0, bcryptjs_1.hash)(usuario.senha, salt);
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
            tipoUsuarioId: tipoUsuario === "admin" ? tipoUsuario_constants_1.TiposUsuarios.ADMIN : tipoUsuario_constants_1.TiposUsuarios.CLIENT,
        },
    });
};
exports.createUsuario = createUsuario;
// Serviço para pegar um usuário pelo ID
const getUsuarioId = async (id) => {
    return await prisma.usuario.findUnique({ where: { id } });
};
exports.getUsuarioId = getUsuarioId;
// Serviço para pegar um usuário pelo Email
const getUsuarioEmail = async (email) => {
    return await prisma.usuario.findUnique({ where: { email } });
};
exports.getUsuarioEmail = getUsuarioEmail;
// Serviço para atualizar um usuário
const updateUsuario = async (id, usuario) => {
    const rounds = parseInt(process.env.BCRYPT_ROUNDS);
    const salt = await (0, bcryptjs_1.genSalt)(rounds);
    const senha = await (0, bcryptjs_1.hash)(usuario.senha, salt);
    return await prisma.usuario.update({
        where: { id },
        data: {
            ...usuario,
            senha,
        },
    });
};
exports.updateUsuario = updateUsuario;
// Serviço para exclusão de um usuário
const deleteUsuario = async (id) => {
    return await prisma.usuario.delete({ where: { id } });
};
exports.deleteUsuario = deleteUsuario;
