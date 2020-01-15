import express from "express";
import * as ResultController from "./controllers/roundResultController";
import * as GameRoundsController from "./controllers/gameRoundController";

export const router = express.Router();
router.post("/result", ResultController.createResult);
router.get("/result/:id", ResultController.getResultById);
router.get("/results", ResultController.getResults);

router.get("/round/:number", GameRoundsController.getRoundByNumber);
router.get("/rounds", GameRoundsController.getRounds);

