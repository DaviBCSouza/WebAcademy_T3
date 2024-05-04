"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const usuario_service_1 = require("./usuario.service");
// Controlador para o "/v1/usuario"
const index = async (req, res) => {
    /*
     #swagger.summary = 'Lista todos os usuários.'
     #swagger.responses[200] = { description: 'Lista de usuários retornada com sucesso.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    try {
        const usuarios = await (0, usuario_service_1.getAllUsuarios)();
        res.status(http_status_codes_1.StatusCodes.OK).json(usuarios);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador para o "/v1/usuario"
const create = async (req, res) => {
    /*
     #swagger.summary = 'Cria um novo usuário.'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Dados do novo usuário.',
       schema: { $ref: '#/definitions/CreateUsuarioDto' }
     }
     #swagger.responses[201] = {
       description: 'Usuário criado com sucesso.',
       schema: { $ref: '#/definitions/UsuarioDto' }
     }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    const usuario = req.body;
    const tipoUsuario = req.query.tipoUsuario;
    try {
        const novoUsuario = await (0, usuario_service_1.createUsuario)(usuario, tipoUsuario);
        res.status(http_status_codes_1.StatusCodes.OK).json(novoUsuario);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador para o "/v1/usuario/'id'"
const read = async (req, res) => {
    /*
     #swagger.summary = 'Recupera dados de um usuário específico por ID.'
     #swagger.parameters['id'] = { description: 'ID do usuário' }
     #swagger.responses[200] = {
       description: 'Usuário encontrado.',
       schema: { $ref: '#/definitions/UsuarioDto' }
     }
     #swagger.responses[404] = { description: 'Usuário não encontrado.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    const { id } = req.params;
    try {
        const usuario = await (0, usuario_service_1.getUsuarioId)(id);
        if (!usuario)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(http_status_codes_1.ReasonPhrases.NOT_FOUND);
        res.status(http_status_codes_1.StatusCodes.OK).json(usuario);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador para o "/v1/usuario/email/'email'"
const readEmail = async (req, res) => {
    /*
     #swagger.summary = 'Recupera dados de um usuário específico por e-mail.'
     #swagger.parameters['email'] = { description: 'E-mail do usuário' }
     #swagger.responses[200] = {
       description: 'Usuário encontrado.',
       schema: { $ref: '#/definitions/UsuarioDto' }
     }
     #swagger.responses[404] = { description: 'Usuário não encontrado.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    const { email } = req.params;
    try {
        const usuario = await (0, usuario_service_1.getUsuarioEmail)(email);
        if (!usuario)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(http_status_codes_1.ReasonPhrases.NOT_FOUND);
        res.status(http_status_codes_1.StatusCodes.OK).json(usuario);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador para o "/v1/usuario/'id'"
const update = async (req, res) => {
    /*
     #swagger.summary = 'Atualiza dados de um usuário específico.'
     #swagger.parameters['id'] = { description: 'ID do usuário' }
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Dados atualizados do usuário.',
       schema: { $ref: '#/definitions/UpdateUsuarioDto' }
     }
     #swagger.responses[204] = { description: 'Atualização bem-sucedida.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    const { id } = req.params;
    const usuario = req.body;
    try {
        const updatedUsuario = await (0, usuario_service_1.updateUsuario)(id, usuario);
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json(updatedUsuario);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador para o "/v1/usuario/'id'"
const remove = async (req, res) => {
    /*
     #swagger.summary = 'Remove um usuário específico.'
     #swagger.parameters['id'] = { description: 'ID do usuário' }
     #swagger.responses[204] = { description: 'Remoção bem-sucedida.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    const { id } = req.params;
    try {
        const deletedUsuario = await (0, usuario_service_1.deleteUsuario)(id);
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json(deletedUsuario);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
exports.default = { index, create, read, readEmail, update, remove };
