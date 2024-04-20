import { Router } from "express";
import routerCategoria from "./categoriaRouter";
import routerClient from "./clienteRouter";
import routerProduct from "./produtoRouter";

const router = Router();

router.use("/clientes", routerClient);
router.use("/produtos", routerProduct);
router.use("/categorias", routerCategoria);

export default router;
