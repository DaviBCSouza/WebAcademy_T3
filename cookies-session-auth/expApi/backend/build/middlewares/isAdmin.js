"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const http_status_codes_1 = require("http-status-codes");
const tipoUsuario_constants_1 = require("../resources/tipoUsuario/tipoUsuario.constants");
const isAdmin = (req, res, next) => {
    if (req.session.tipoUsuarioId === tipoUsuario_constants_1.TiposUsuarios.ADMIN)
        next();
    else
        return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json(http_status_codes_1.ReasonPhrases.FORBIDDEN);
};
exports.isAdmin = isAdmin;
