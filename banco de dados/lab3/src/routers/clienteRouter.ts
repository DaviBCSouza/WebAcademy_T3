import { Router } from "express";
import clienteController from "../controllers/clienteController";

const routerClient = Router();

routerClient.get("/", clienteController.index);
routerClient.post("/", clienteController.create);
routerClient.get("/:cpf", clienteController.read);
routerClient.put("/:cpf", clienteController.update);
routerClient.delete("/:cpf", clienteController.remove);

export default routerClient;
