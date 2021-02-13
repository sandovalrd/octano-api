import User from "../models/Player";
import { Router } from "express";
import GameController from "../controllers/game.controller";
const router = Router();
const game = new GameController();

router.get("/", async (req, res) => {
  await game.searchGames(req, res);
});

router.post("/start", async (req, res) => {
  await game.newGame(req, res);
});

router.put("/play/:id", async (req, res) => {
  await game.updateGame(req, res);
});

export default router;
