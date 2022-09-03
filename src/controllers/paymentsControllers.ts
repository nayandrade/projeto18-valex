import { Request, Response } from "express";
import paymentServices from "../services/paymentServices";

export async function postPayment(req: Request, res: Response) {
  const {
    cardId,
    businessId,
    amount,
  }: { cardId: number; businessId: number; amount: number } = req.body;
  try {
    const paymentData = await paymentServices(cardId, businessId, amount);
    res.status(200).send(paymentData);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
