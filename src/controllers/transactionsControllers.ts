import { Request, Response } from "express";
// import transactionServices from "../services/transactionServices";
import cardBalanceServices from "../services/cardBalanceServices"

export async function getDetaildBalance(req: Request, res: Response) {
  const id: string = req.params.id;
  if (!id) {
    return res.sendStatus(422);
  }
  try {
    const cardData = await cardBalanceServices(parseInt(id));
    res.status(200).send(cardData);
  } catch (error) {
    res.status(500).send(error);
  }
}
