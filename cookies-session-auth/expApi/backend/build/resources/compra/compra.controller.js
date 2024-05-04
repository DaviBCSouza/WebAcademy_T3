"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const compra_service_1 = require("./compra.service");
// Controlador para listar todas as compras em "v1/compra/"
const index = async (req, res) => {
    /*
     #swagger.summary = 'Lista todas as compras.'
     #swagger.responses[200] = {
       description: 'Lista de compras retornada com sucesso.',
       schema: { $ref: '#/definitions/Compra' }
     }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    try {
        const compras = await (0, compra_service_1.listCompras)();
        res.status(http_status_codes_1.StatusCodes.OK).json(compras);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador para criar uma compra sem produtos em "v1/compra/"
const create = async (req, res) => {
    /*
     #swagger.summary = 'Cria uma nova compra sem produtos.'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Dados da nova compra.',
       schema: { $ref: '#/definitions/CreateCompraDto' }
     }
     #swagger.responses[201] = {
       description: 'Compra criada com sucesso.',
       schema: { $ref: '#/definitions/Compra' }
     }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    const compra = req.body;
    try {
        const novaCompra = await (0, compra_service_1.createCompra)(compra);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(novaCompra);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador para pegar uma compra em "v1/compra/'id'"
const read = async (req, res) => {
    /*
     #swagger.summary = 'Recupera dados de uma compra específica por ID.'
     #swagger.parameters['id'] = { description: 'ID da compra' }
     #swagger.responses[200] = {
       description: 'Compra encontrada.',
       schema: { $ref: '#/definitions/Compra' }
     }
     #swagger.responses[404] = { description: 'Compra não encontrada.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    const { id } = req.params;
    try {
        const compra = await (0, compra_service_1.getCompra)(id);
        if (!compra)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(http_status_codes_1.ReasonPhrases.NOT_FOUND);
        res.status(http_status_codes_1.StatusCodes.OK).json(compra);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador para atualizar as informações de uma compra em "v1/compra/'id'"
const update = async (req, res) => {
    /*
     #swagger.summary = 'Atualiza informações de uma compra específica.'
     #swagger.parameters['id'] = { description: 'ID da compra' }
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Dados atualizados da compra.',
       schema: { $ref: '#/definitions/UpdateCompraDto' }
     }
     #swagger.responses[204] = { description: 'Atualização bem-sucedida.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    const { id } = req.params;
    const compra = req.body;
    try {
        const updatedCompra = await (0, compra_service_1.updateCompra)(id, compra);
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json(updatedCompra);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador para excluir uma compra em "v1/compra/'id'"
const remove = async (req, res) => {
    /*
     #swagger.summary = 'Remove uma compra específica.'
     #swagger.parameters['id'] = { description: 'ID da compra' }
     #swagger.responses[204] = { description: 'Remoção bem-sucedida.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    const { id } = req.params;
    try {
        const deletedCompra = await (0, compra_service_1.deleteCompra)(id);
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json(deletedCompra);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador para adicionar produtos ao carrinho em "v1/compra/adicionar"
const addProduto = async (req, res) => {
    /*
     #swagger.summary = 'Adiciona produtos ao carrinho de compras.'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Informações do produto a ser adicionado ao carrinho.',
       schema: { $ref: '#/definitions/AddProduto' }
     }
     #swagger.responses[200] = {
       description: 'Produto adicionado ao carrinho com sucesso.',
       schema: { $ref: '#/definitions/Carrinho' }
     }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    const { produtoId, quantidade } = req.body;
    try {
        const carrinho = req.session.carrinho || {};
        if (carrinho[produtoId]) {
            carrinho[produtoId] += quantidade;
        }
        else {
            carrinho[produtoId] = quantidade;
        }
        req.session.carrinho = carrinho;
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Produto adicionado ao carrinho com sucesso",
            carrinho,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador para concluir uma compra em "v1/compra/concluir"
const checkoutCompra = async (req, res) => {
    /*
     #swagger.summary = 'Conclui uma compra.'
     #swagger.responses[200] = {
       description: 'Compra concluída com sucesso.',
       schema: { $ref: '#/definitions/Checkout' }
     }
     #swagger.responses[400] = { description: 'Carrinho de compras vazio.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    try {
        const usuarioId = req.session.uid;
        const carrinho = req.session.carrinho || {};
        if (Object.keys(carrinho).length === 0) {
            throw new Error("Carrinho de compras vazio");
        }
        const compra = await (0, compra_service_1.concluirCompra)(usuarioId, carrinho);
        // Limpar o carrinho de compras da sessão após a conclusão da compra
        req.session.carrinho = {};
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: "Compra concluída com sucesso", compra });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
exports.default = {
    index,
    create,
    read,
    update,
    remove,
    addProduto,
    checkoutCompra,
};
