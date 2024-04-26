import { Router } from "express";
import authRouter from "../resources/auth/auth.router";
import compraRouter from "../resources/compra/compra.router";
import languageRouter from "../resources/language/language.router";
import produtoRouter from "../resources/produto/produto.router";
import usuarioRouter from "../resources/usuario/usuario.router";

const router = Router();

router.use("/", authRouter);
router.use("/language", languageRouter);
router.use("/usuario", usuarioRouter);
router.use("/compra", compraRouter);
router.use("/produto", produtoRouter);

export default router;
