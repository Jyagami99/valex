import { Router } from "express";
import paymentController from "../controllers/paymentController";
import validateSchema from "../middlewares/schemaValidator";
import paymentOnlineSchema from "../schemas/paymentOnlineSchema";
import paymentSchema from "../schemas/paymentSchema";

const router = Router();

router.post(
  "/",
  validateSchema(paymentSchema),
  paymentController.createPayments
);

router.post(
  "/online",
  validateSchema(paymentOnlineSchema),
  paymentController.createOnlinePayments
);

export default router;
