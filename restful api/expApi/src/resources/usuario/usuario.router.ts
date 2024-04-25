import { Router } from "express";
import isAdmin from "../../middlewares/isAdmin";
import isAuth from "../../middlewares/isAuth";
import validateBody from "../../middlewares/validateBody";
import usuarioController from "./usuario.controller";
import { usuarioSchema } from "./usuario.schemas";

const router = Router();

router.get("/", isAuth, usuarioController.index);
router.post(
  "/",
  isAdmin,
  validateBody(usuarioSchema),
  usuarioController.create
);
router.get("/:id", isAuth, usuarioController.read);
router.get("/email/:email", isAuth, usuarioController.readEmail);
router.put(
  "/:id",
  isAdmin,
  validateBody(usuarioSchema),
  usuarioController.update
);
router.delete("/:id", isAdmin, usuarioController.remove);

export default router;
