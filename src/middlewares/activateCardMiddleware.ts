import { Request, Response, NextFunction } from "express";

async function activateCardMiddleware(req: Request, res: Response, next: NextFunction) {
  const {
    securityCode,
    password,
    number,
    cardholderName,
    expirationDate,
  }: {
    securityCode: string;
    password: string;
    number: string;
    cardholderName: string;
    expirationDate: string;
  } = req.body;
  if (
    !securityCode ||
    !password ||
    !number ||
    !cardholderName ||
    !expirationDate || password.length !== 4
  ) {
    return res.sendStatus(422);
  }
  next();
}

export default activateCardMiddleware;
