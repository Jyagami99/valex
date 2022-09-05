import { NextFunction, Request, Response } from "express";
import rechargeService from "../services/rechargeService";

async function createRecharges(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bodyData = req.body;
  const apiKey = res.locals["x-api-key"];

  await rechargeService.createRecharges(apiKey, bodyData);

  res.sendStatus(201);
}

export default {
  createRecharges,
};
