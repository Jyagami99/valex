import { NextFunction, Request, Response } from "express";
import cardService from "../services/cardService";

async function createCards(req: Request, res: Response, next: NextFunction) {
  const bodyData = req.body;
  const apiKey = res.locals["x-api-key"];

  await cardService.createCards(apiKey, bodyData);
  res.sendStatus(201);
}

async function activateCard(req: Request, res: Response, next: NextFunction) {
  const bodyData = req.body;
  await cardService.activateCard(bodyData);
  res.sendStatus(200);
}

async function getBalance(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const cardBalance = await cardService.getBalance(Number(id));
}

async function blockCard(req: Request, res: Response, next: NextFunction) {
  const bodyData = req.body;
  await cardService.blockCard(bodyData);
  res.sendStatus(200);
}

async function unblockCard(req: Request, res: Response, next: NextFunction) {
  const bodyData = req.body;
  await cardService.unblockCard(bodyData);
  res.sendStatus(200);
}

export default {
  createCards,
  activateCard,
  getBalance,
  blockCard,
  unblockCard,
};
