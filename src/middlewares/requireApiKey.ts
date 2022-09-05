import { NextFunction, Request, Response } from "express";
import errorFactory from "../utils/error";

export default function requireApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-api-key"];
  if (typeof apiKey !== "string")
    throw errorFactory("invalid_api_key", "Api Key must be  of type string.");

  res.locals["x-api-key"] = apiKey;

  next();
}
