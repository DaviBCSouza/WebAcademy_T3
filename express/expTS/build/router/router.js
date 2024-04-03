"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = __importDefault(require("../controllers/main"));
const router = (0, express_1.Router)();
// Main Controller
router.get('/', main_1.default.index);
router.get('/lorem/:paragraphs', main_1.default.lorem);
router.get('/hb1', main_1.default.hb1);
router.get('/hb2', main_1.default.hb2);
router.get('/hb3', main_1.default.hb3);
router.get('/hb3-1', main_1.default.hb3_1);
router.get('/hb4', main_1.default.hb4);
router.use(main_1.default.erro);
exports.default = router;
