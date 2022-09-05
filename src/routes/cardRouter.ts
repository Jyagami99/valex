import { Router } from "express";
import cardController from "../controllers/cardController";
import requireApiKey from "../middlewares/requireApiKey";
import validateSchema from "../middlewares/schemaValidator";
import cardSchema from "../schemas/cardSchema";

const router = Router();

router.post(
  "/",
  validateSchema(cardSchema),
  requireApiKey,
  cardController.createCards
);
