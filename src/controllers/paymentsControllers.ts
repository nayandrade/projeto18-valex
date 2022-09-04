import { Request, Response } from "express";
import paymentServices from "../services/paymentServices";

export async function postPayment(req: Request, res: Response) {
  const {
    cardId,
    businessId,
    amount,
    password
  }: { cardId: number; businessId: number; amount: number, password: string } = req.body;
  try {
    await paymentServices(cardId, businessId, amount, password);
    res.sendStatus(201)
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
