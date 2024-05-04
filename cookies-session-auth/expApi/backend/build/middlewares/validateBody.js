"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error)
            return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json(error);
        next();
    };
};
exports.default = validateBody;
