import { Router } from "express";
import languageRouter from "../resources/language/language.router";
import produtoRouter from "../resources/produto/produto.router";
import usuarioRouter from "../resources/usuario/usuario.router";

const router = Router();

router.use("/usuario", usuarioRouter);
router.use("/produto", produtoRouter);
router.use("/language", languageRouter);

export default router;
