import { Router } from "express";
import produtoController from "../controllers/produtoController";

const routerProduct = Router();

routerProduct.get("/", produtoController.index);
routerProduct.post("/", produtoController.create);
routerProduct.get("/:id", produtoController.read);
routerProduct.put("/:id", produtoController.update);
routerProduct.delete("/:id", produtoController.remove);

export default routerProduct;
