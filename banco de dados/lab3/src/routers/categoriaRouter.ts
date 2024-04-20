import { Router } from "express";
import categoriaController from "../controllers/categoriaController";

const routerCategoria = Router();

routerCategoria.get("/", categoriaController.index);
routerCategoria.post("/", categoriaController.create);
routerCategoria.get("/:id", categoriaController.read);
routerCategoria.put("/:id", categoriaController.update);
routerCategoria.delete("/:id", categoriaController.remove);

export default routerCategoria;
