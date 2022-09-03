import { NextFunction, Request, Response } from "express";
import * as cardRepository from "../repositories/cardRepository"

export default function createCardMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    employeeId,
    type,
  }: { employeeId: number; type: cardRepository.TransactionTypes } = req.body;
  if (!employeeId || !type) {
    return res.sendStatus(422);
  }
  next()
}
