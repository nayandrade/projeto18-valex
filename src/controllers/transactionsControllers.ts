import { Request, Response } from "express";
import transactionServices from "../services/transactionServices";

export async function getTransactionsData(req: Request, res: Response) {
  const id: string = req.params.id;
  console.log(id);
  if (!id) {
    return res.sendStatus(422);
  }
  try {
    const cardData = await transactionServices(parseInt(id));
    res.status(200).send(cardData);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
