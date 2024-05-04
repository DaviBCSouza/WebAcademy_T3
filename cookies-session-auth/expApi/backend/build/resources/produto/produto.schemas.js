"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.produtoSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.produtoSchema = joi_1.default.object().keys({
    nome: joi_1.default.string().min(5).max(100).required(),
    preco: joi_1.default.number().required(),
    estoque: joi_1.default.number().positive().integer().required(),
});
