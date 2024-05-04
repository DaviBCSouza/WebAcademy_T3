"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.languageSchema = joi_1.default.object().keys({
    lang: joi_1.default.valid("pt-BR", "en-US").required().messages({
        "any.only": "Compatível somente com 'pt-BR' ou 'en-US'",
    }),
});
