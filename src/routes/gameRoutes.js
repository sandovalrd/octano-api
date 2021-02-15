import User from "../models/Player";
import { Router } from "express";
import GameController from "../controllers/game.controller";
import authorization from "../middleware/authorization";
const router = Router();
const game = new GameController();

router.get("/", async (req, res) => {
  await game.searchGames(req, res);
});

router.post("/start", authorization, async (req, res) => {
  await game.newGame(req, res);
});

router.put("/play/:id", authorization, async (req, res) => {
  await game.updateGame(req, res);
});

export default router;
