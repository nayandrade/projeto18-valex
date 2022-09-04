import { NextFunction, Request, Response } from "express";

export default function validateSchema(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(422).send(error.details.map((e: any) => e.message).join(", "));
      return;
    }
    next();
  };
}