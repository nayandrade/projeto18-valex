import { NextFunction, Request, Response } from "express";

export default function getBallanceMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id: string = req.params.id;
  if (!id || !Number(parseInt(id))) {
    return res.sendStatus(422);
  }
  res.locals = { id: id }
  next();
}
