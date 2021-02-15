import User from "../models/Player";
import { Router } from "express";
import MoveController from "../controllers/move.controller";
import MoveConfigController from "../controllers/moveConfig.controller";
import validateDelete from "../middleware/validateDelete";
import validMoviConfig from "../middleware/validMoviConfig";
import authorization from "../middleware/authorization";

const router = Router();
const move = new MoveController();
const moveConfig = new MoveConfigController();

// Config moves
router.get("/config", async (req, res) => {
  await moveConfig.searchMovesConfig(req, res);
});

router.delete(
  "/config/:id",
  [authorization, validateDelete],
  async (req, res) => {
    await moveConfig.deleteConfigMove(req, res);
  }
);

router.post("/config", [authorization, validMoviConfig], async (req, res) => {
  console.log(1);
  await moveConfig.addMovesConfig(req, res);
});

// Moves
router.get("/", async (req, res) => {
  await move.searchMoves(req, res);
});

router.get("/:id", async (req, res) => {
  await move.searchOneMove(req, res);
});

router.post("/", authorization, async (req, res) => {
  await move.addMove(req, res);
});

router.delete("/:id", authorization, validateDelete, async (req, res) => {
  await move.deleteMove(req, res);
});

export default router;
