import { Router } from "express";
import cardController from "../controllers/cardController";
import requireApiKey from "../middlewares/requireApiKey";
import validateSchema from "../middlewares/schemaValidator";
import cardActivationSchema from "../schemas/cardActivationSchema";
import cardSchema from "../schemas/cardSchema";
import cardSecuritySchema from "../schemas/cardSecuritySchema";

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
router.get("/:id/balance", cardController.getBalance);
router.put(
  "/block",
  validateSchema(cardSecuritySchema),
  cardController.blockCard
);
router.put(
  "/unblock",
  validateSchema(cardSecuritySchema),
  cardController.unblockCard
);

export default router;
