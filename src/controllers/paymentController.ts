import { NextFunction, Request, Response } from "express";
import paymentService from "../services/paymentService";

async function createPayments(req: Request, res: Response, next: NextFunction) {
  const bodyData = req.body;
  const paymentData = {
    cardId: bodyData.cardId,
    businessId: bodyData.businessId,
    amount: bodyData.amount,
  };

  await paymentService.createPayments(paymentData, bodyData.password);

  res.sendStatus(201);
}

async function createOnlinePayments(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bodyData = req.body;

  await paymentService.createOnlinePayments(bodyData);
  
  res.sendStatus(201);
}

export default {
  createPayments,
  createOnlinePayments,
};
