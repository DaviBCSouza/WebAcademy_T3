"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concluirCompra = exports.deleteCompra = exports.updateCompra = exports.getCompra = exports.createCompra = exports.listCompras = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Serviço para listar todas as compras
const listCompras = async () => {
    return await prisma.compra.findMany();
};
exports.listCompras = listCompras;
// Serviço para criar uma compra
const createCompra = async (compra) => {
    return await prisma.compra.create({ data: compra });
};
exports.createCompra = createCompra;
// Serviço para pegar uma compra
const getCompra = async (id) => {
    return await prisma.compra.findUnique({ where: { id } });
};
exports.getCompra = getCompra;
// Serviço para atualizar uma compra
const updateCompra = async (id, compra) => {
    return await prisma.compra.update({ data: compra, where: { id } });
};
exports.updateCompra = updateCompra;
// Serviço para excluir uma compra
const deleteCompra = async (id) => {
    return await prisma.compra.delete({ where: { id } });
};
exports.deleteCompra = deleteCompra;
// Serviço para concluir uma compra
const concluirCompra = async (usuarioId, carrinho) => {
    // Verifica se o usuário existe
    const usuario = await prisma.usuario.findUnique({
        where: { id: usuarioId },
    });
    if (!usuario) {
        throw new Error("Usuário não encontrado");
    }
    // Inicia uma transação para garantir consistência entre a atualização do estoque e a criação da compra
    const transaction = await prisma.$transaction(async (prisma) => {
        // Salva os produtos do carrinho no banco de dados e atualizar o estoque
        const compraItens = [];
        for (const [produtoId, quantidade] of Object.entries(carrinho)) {
            const produto = await prisma.produto.findUnique({
                where: { id: produtoId },
            });
            if (!produto) {
                throw new Error(`Produto com ID ${produtoId} não encontrado`);
            }
            if (produto.estoque < Number(quantidade)) {
                throw new Error(`Estoque insuficiente para o produto ${produto.nome}`);
            }
            // Cria o registro de compraItem
            compraItens.push({
                produtoId,
                quantidade: Number(quantidade),
            });
            // Atualiza o estoque do produto
            await prisma.produto.update({
                where: { id: produtoId },
                data: { estoque: produto.estoque - Number(quantidade) },
            });
        }
        // Cria a compra e os itens associados
        const compra = await prisma.compra.create({
            data: {
                usuario: { connect: { id: usuarioId } },
                compraItens: {
                    create: compraItens,
                },
            },
            include: { compraItens: true },
        });
        return compra;
    });
    return transaction;
};
exports.concluirCompra = concluirCompra;
