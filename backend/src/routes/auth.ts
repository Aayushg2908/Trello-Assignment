import express from "express";
import {
  LoginController,
  RegisterController,
  LogoutController,
  MeController,
} from "../controllers/auth";
import { authMiddleware } from "../helpers/middleware";

const router = express.Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);
router.post("/logout", LogoutController);
router.get("/me", authMiddleware, MeController);

export default router;
