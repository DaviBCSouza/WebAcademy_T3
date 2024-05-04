"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const http_status_codes_1 = require("http-status-codes");
const isAdmin = (req, res, next) => {
    if (req.session.uid)
        next();
    else
        return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json(http_status_codes_1.ReasonPhrases.FORBIDDEN);
};
exports.isAdmin = isAdmin;
