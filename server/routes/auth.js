import jwt from "jsonwebtoken";
import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();
const auth = new AuthController();

router.post("/", (req, res) => {
  auth.authToken(req, res);
});

export default router;
