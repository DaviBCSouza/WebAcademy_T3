"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
// Controlador para alterar o idioma em "v1/"
const changeLanguage = (req, res) => {
    /*
     #swagger.summary = 'Altera o idioma da aplicação.'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Objeto contendo o novo idioma.',
       schema: { $ref: '#/definitions/ChangeLangDto' }
     }
     #swagger.responses[204] = { description: 'Idioma alterado com sucesso.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.', }
    */
    const { lang } = req.body;
    res.cookie("lang", lang);
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json();
};
exports.default = { changeLanguage };
