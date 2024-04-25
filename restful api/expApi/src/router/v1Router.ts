import { Router } from "express";
import authRouter from "../resources/auth/auth.router";
import languageRouter from "../resources/language/language.router";
import produtoRouter from "../resources/produto/produto.router";
import usuarioRouter from "../resources/usuario/usuario.router";

const router = Router();

router.use("/", authRouter);
router.use("/language", languageRouter);
router.use("/usuario", usuarioRouter);
router.use("/produto", produtoRouter);

export default router;
