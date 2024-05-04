"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const produto_service_1 = require("./produto.service");
// Controlador para o "/v1/produto/"
const index = async (req, res) => {
    /*
     #swagger.summary = 'Lista todos os produtos.'
     #swagger.responses[200] = { description: 'Lista de produtos retornada com sucesso.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    try {
        const produtos = await (0, produto_service_1.listProdutos)();
        res.status(http_status_codes_1.StatusCodes.OK).json(produtos);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador de criar um produto para o "/v1/produto/"
const create = async (req, res) => {
    /*
   #swagger.summary = 'Adiciona um novo produto na base.'
   #swagger.parameters['body'] = {
   description: 'Objeto contendo os dados do produto',
   in: 'body',
   schema: { $ref: '#/definitions/CreateProdutoDto' }
   }
   #swagger.responses[200] = {
   schema: { $ref: '#/definitions/Produto' }
   }
   */
    const produto = req.body;
    try {
        if (await (0, produto_service_1.checkNomeIsAvaliable)(produto.nome)) {
            const novoProduto = await (0, produto_service_1.createProduto)(produto);
            res.status(http_status_codes_1.StatusCodes.CREATED).json(novoProduto);
        }
        else {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).json(http_status_codes_1.ReasonPhrases.CONFLICT);
        }
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador de pegar um produto para o "/v1/produto/:id"
const read = async (req, res) => {
    /*
   #swagger.summary = 'Recupera dados de um produto específico.'
   #swagger.parameters['id'] = { description: 'ID do produto' }
   #swagger.responses[200] = {
   schema: { $ref: '#/definitions/Produto' }
   }
   */
    const { id } = req.params;
    try {
        const produto = await (0, produto_service_1.getProduto)(id);
        if (!produto)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(http_status_codes_1.ReasonPhrases.NOT_FOUND);
        res.status(http_status_codes_1.StatusCodes.OK).json(produto);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador de atualizar um produto para o "/v1/produto/:id"
const update = async (req, res) => {
    /*
   #swagger.summary = 'Atualiza dados de um produto específico.'
   #swagger.parameters['id'] = { description: 'ID do produto' }
    #swagger.parameters['body'] = {
   description: 'Objeto contendo as alterações do produto',
   in: 'body',
   schema: { $ref: '#/definitions/UpdateProdutoDto' }
   }
   #s
   #swagger.responses[204] = { description: 'Atualização bem-sucedida.' }
   #swagger.responses[404] = { description: 'Produto não encontrado.' }
   #swagger.responses[409] = { description: 'Nome de produto já existente.' }
   */
    const { id } = req.params;
    const produto = req.body;
    try {
        if (await (0, produto_service_1.checkNomeIsAvaliable)(produto.nome, id)) {
            const updatedProduto = await (0, produto_service_1.updateProduto)(id, produto);
            res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json(updatedProduto);
        }
        else {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).json(http_status_codes_1.ReasonPhrases.CONFLICT);
        }
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador de remover um produto para o "/v1/produto/:id"
const remove = async (req, res) => {
    /*
     #swagger.summary = 'Remove um produto específico.'
     #swagger.parameters['id'] = { description: 'ID do produto' }
     #swagger.responses[204] = { description: 'Remoção bem-sucedida.' }
     #swagger.responses[404] = { description: 'Produto não encontrado.' }
    */
    const { id } = req.params;
    try {
        const deletedProduto = await (0, produto_service_1.deleteProduto)(id);
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json(deletedProduto);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
exports.default = { index, create, read, update, remove };
