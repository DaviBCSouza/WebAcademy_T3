import { Router } from "express";
import languageRouter from "../resources/language/language.router";
import produtoRouter from "../resources/produto/produto.router";

const router = Router();

router.use("/produto", produtoRouter);
router.use("/language", languageRouter);

export default router;
