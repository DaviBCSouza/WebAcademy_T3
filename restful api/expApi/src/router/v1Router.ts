import { Router } from "express";
import authRouter from "../resources/auth/auth.router";
import compraRouter from "../resources/compra/compra.router";
import languageRouter from "../resources/language/language.router";
import produtoRouter from "../resources/produto/produto.router";
import usuarioRouter from "../resources/usuario/usuario.router";

const router = Router();

router.use(
  "/",
  // #swagger.tags = ["Auth"]
  authRouter
);
router.use(
  "/language",
  // #swagger.tags = ["Language"]
  languageRouter
);
router.use(
  "/usuario",
  // #swagger.tags = ["Usuario"]
  usuarioRouter
);
router.use(
  "/compra",
  // #swagger.tags = ["Compra"]
  compraRouter
);
router.use(
  "/produto",
  // #swagger.tags = ["Produto"]
  produtoRouter
);

export default router;
