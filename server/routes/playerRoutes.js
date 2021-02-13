import User from "../models/Player";
import { Router } from "express";
import PlayerController from "../controllers/player.controller";
import authorization from "../middleware/authorization";

const router = Router();
const player = new PlayerController();

router.get("/", async (req, res) => {
  await player.searchPlayer(req, res);
});

router.get("/:id", async (req, res) => {
  await player.searchOnePlayer(req, res);
});

router.post("/", authorization, async (req, res) => {
  await player.addPlayer(req, res);
});

router.put("/:id", authorization, async (req, res) => {
  await player.updatePlayer(req, res);
});

export default router;
