import { Router } from "express";
import languageController from "./language.controller";

const router = Router();

router.post("/", languageController.changeLanguage);

export default router;
