import express from "express";
import * as Controller from "./controller";

export const router = express.Router();
router.post("/result", Controller.createResult);
router.get("/result/:id", Controller.getResultById);
router.get("/results", Controller.getResults);
