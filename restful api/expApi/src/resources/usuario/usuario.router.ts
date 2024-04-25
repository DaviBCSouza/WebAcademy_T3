import { Router } from "express";
import validateBody from "../../middlewares/validateBody";
import usuarioController from "./usuario.controller";
import { usuarioSchema } from "./usuario.schemas";

const router = Router();

router.get("/", usuarioController.index);
router.post("/", validateBody(usuarioSchema), usuarioController.create);
router.get("/:id", usuarioController.read);
router.get("/email/:email", usuarioController.readEmail);
router.put("/:id", validateBody(usuarioSchema), usuarioController.update);
router.delete("/:id", usuarioController.remove);

export default router;
