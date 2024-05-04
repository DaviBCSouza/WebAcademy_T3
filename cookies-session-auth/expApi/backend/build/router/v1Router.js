"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("../resources/auth/auth.router"));
const compra_router_1 = __importDefault(require("../resources/compra/compra.router"));
const language_router_1 = __importDefault(require("../resources/language/language.router"));
const produto_router_1 = __importDefault(require("../resources/produto/produto.router"));
const usuario_router_1 = __importDefault(require("../resources/usuario/usuario.router"));
const router = (0, express_1.Router)();
router.use("/", 
// #swagger.tags = ["Auth"]
auth_router_1.default);
router.use("/language", 
// #swagger.tags = ["Language"]
language_router_1.default);
router.use("/usuario", 
// #swagger.tags = ["Usuario"]
usuario_router_1.default);
router.use("/compra", 
// #swagger.tags = ["Compra"]
compra_router_1.default);
router.use("/produto", 
// #swagger.tags = ["Produto"]
produto_router_1.default);
exports.default = router;
