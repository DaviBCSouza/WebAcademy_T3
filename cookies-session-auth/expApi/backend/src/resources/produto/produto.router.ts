import { Router } from "express";
import { isAdmin } from "../../middlewares/isAdmin";
import validateBody from "../../middlewares/validateBody";
import produtoController from "./produto.controller";
import { produtoSchema } from "./produto.schemas";

const router = Router();

router.get("/", produtoController.index);
router.post(
  "/",
  isAdmin,
  validateBody(produtoSchema),
  produtoController.create
);
router.get("/:id", produtoController.read);
router.put(
  "/:id",
  isAdmin,
  validateBody(produtoSchema),
  produtoController.update
);
router.delete("/:id", produtoController.remove);

export default router;
