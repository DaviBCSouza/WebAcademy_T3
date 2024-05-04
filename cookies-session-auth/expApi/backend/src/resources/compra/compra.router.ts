import { Router } from "express";
import compraController from "./compra.controller";

const router = Router();

router.get("/", compraController.index);
router.post("/", compraController.create);
router.get("/:id", compraController.read);
router.put("/:id", compraController.update);
router.post("/adicionar", compraController.addProduto);
router.post("/concluir", compraController.checkoutCompra);
router.delete("/:id", compraController.remove);

export default router;
