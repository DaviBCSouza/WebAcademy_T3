import { Router } from "express";
import validateBody from "../../middlewares/validateBody";
import languageController from "./language.controller";
import { languageSchema } from "./language.schemas";

const router = Router();

router.post(
  "/",
  validateBody(languageSchema),
  languageController.changeLanguage
);

export default router;
