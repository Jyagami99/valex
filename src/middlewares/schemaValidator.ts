import { NextFunction, Request, Response } from "express";

export default function validateSchema(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    const result = error.details.map(
      (item: { message: string }) => item.message
    );
    if (error) return res.status(422).send(result);

    next();
  };
}
