import { Router } from "express";
import isAuth from "../../middlewares/isAuth";
import authController from "./auth.controller";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", isAuth, authController.logout);

export default router;
