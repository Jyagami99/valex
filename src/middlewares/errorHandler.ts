import { Request, Response, NextFunction } from "express";

function errorHandler(
  error: { type: string; message: string },
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === "not_found") return res.status(404).send(error.message);
  if (error.type === "limit_reached")
    return res.status(412).send(error.message);
  if (error.type === "conflict") return res.status(422).send(error.message);
  if (error.type === "card_expired" || error.type === "invalid_security_code")
    return res.status(403).send(error.message);
  if (error.type === "invalid_type") return res.status(403).send(error.message);
  if (error.type === "blocked_card") return res.status(403).send(error.message);
  if (error.type === "expired_card") return res.status(403).send(error.message);
  if (error.type === "inactive_card")
    return res.status(403).send(error.message);
  if (error.type === "invalid_password")
    return res.status(401).send("Verify the information provided.");
  if (error.type === "insufficient_balance")
    return res.status(401).send(error.message);
  if (error.type === "invalid_api_key")
    return res.status(401).send(error.message);

  return res.sendStatus(500);
}

export default errorHandler;
