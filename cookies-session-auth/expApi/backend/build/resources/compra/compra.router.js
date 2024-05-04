"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compra_controller_1 = __importDefault(require("./compra.controller"));
const router = (0, express_1.Router)();
router.get("/", compra_controller_1.default.index);
router.post("/", compra_controller_1.default.create);
router.get("/:id", compra_controller_1.default.read);
router.put("/:id", compra_controller_1.default.update);
router.post("/adicionar", compra_controller_1.default.addProduto);
router.post("/concluir", compra_controller_1.default.checkoutCompra);
router.delete("/:id", compra_controller_1.default.remove);
exports.default = router;
