import { Router } from "express";
import rechargeController from "../controllers/rechargeController";
import requireApiKey from "../middlewares/requireApiKey";
import validateSchema from "../middlewares/schemaValidator";
import rechargeSchema from "../schemas/rechargeSchema";

const router = Router();

router.post(
  "/",
  validateSchema(rechargeSchema),
  requireApiKey,
  rechargeController.createRecharges
);

export default router;
