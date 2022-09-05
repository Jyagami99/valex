import { Router } from "express";
import cardController from "../controllers/cardController";
import requireApiKey from "../middlewares/requireApiKey";
import validateSchema from "../middlewares/schemaValidator";
import cardActivationSchema from "../schemas/cardActivationSchema";
import cardSchema from "../schemas/cardSchema";

const router = Router();

router.post(
  "/",
  validateSchema(cardSchema),
  requireApiKey,
  cardController.createCards
);
router.put(
  "/activate",
  validateSchema(cardActivationSchema),
  cardController.activateCard
);

export default router;
