"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduto = exports.updateProduto = exports.getProduto = exports.createProduto = exports.listProdutos = exports.checkNomeIsAvaliable = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Serviço para verificar se o produto já existe
const checkNomeIsAvaliable = async (nome, ignoreId) => {
    const produto = await prisma.produto.findUnique({ where: { nome } });
    if (!produto)
        return true;
    if (ignoreId && produto.id === ignoreId)
        return true;
    return false;
};
exports.checkNomeIsAvaliable = checkNomeIsAvaliable;
// Serviço para todos os produtos existentes
const listProdutos = async () => {
    return await prisma.produto.findMany();
};
exports.listProdutos = listProdutos;
// Serviço para criar um produto
const createProduto = async (produto) => {
    return await prisma.produto.create({ data: produto });
};
exports.createProduto = createProduto;
// Serviço para pegar um produto pelo ID
const getProduto = async (id) => {
    return await prisma.produto.findUnique({ where: { id } });
};
exports.getProduto = getProduto;
// Serviço para atualizar um produto
const updateProduto = async (id, produto) => {
    return await prisma.produto.update({ data: produto, where: { id } });
};
exports.updateProduto = updateProduto;
// Serviço para excluir um produto
const deleteProduto = async (id) => {
    return await prisma.produto.delete({ where: { id } });
};
exports.deleteProduto = deleteProduto;
