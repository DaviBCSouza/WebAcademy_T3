"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const usuario_service_1 = require("../usuario/usuario.service");
const auth_service_1 = require("./auth.service");
// Controlador para cadastro de usuário em "/v1/signup"
const signup = async (req, res) => {
    /*
     #swagger.summary = 'Cadastra um novo usuário.'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Dados do novo usuário.',
       schema: { $ref: '#/definitions/SignUpDto' }
     }
     #swagger.responses[201] = {
       description: 'Usuário cadastrado com sucesso.',
       schema: { $ref: '#/definitions/Usuario' }
     }
     #swagger.responses[400] = { description: 'E-mail informado já está sendo utilizado.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    const usuario = req.body;
    try {
        const novoUsuario = await (0, usuario_service_1.createUsuario)(usuario, "client");
        res.status(http_status_codes_1.StatusCodes.CREATED).json(novoUsuario);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador para logar o usuário em "/v1/login"
const login = async (req, res) => {
    /*
     #swagger.summary = 'Autentica o usuário.'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Credenciais de login.',
       schema: { $ref: '#/definitions/LoginDto' }
     }
     #swagger.responses[200] = { description: 'Usuário autenticado com sucesso.' }
     #swagger.responses[401] = { description: 'Email e/ou senha incorretos.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    const credentials = req.body;
    try {
        const usuario = await (0, auth_service_1.checkCredentials)(credentials);
        if (!usuario)
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
        req.session.uid = usuario.id;
        req.session.tipoUsuarioId = usuario.tipoUsuarioId;
        res.status(http_status_codes_1.StatusCodes.OK).json(usuario);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};
// Controlador para logout do usuário em "/v1/logout"
const logout = async (req, res) => {
    /*
     #swagger.summary = 'Realiza o logout do usuário.'
     #swagger.responses[200] = { description: 'Logout realizado com sucesso.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    if (req.session.uid) {
        req.session.destroy(() => {
            res.clearCookie("connect.sid", { path: "/" });
            res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Logout realizado com sucesso" });
        });
    }
    else {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
    }
};
exports.default = { signup, login, logout };
