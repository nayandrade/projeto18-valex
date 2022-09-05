import { Request, Response } from "express";
import cardBalanceServices from "../services/cardBalanceServices";

export async function getDetaildBalance(req: Request, res: Response) {
  const { id } = res.locals;

  try {
    const cardData = await cardBalanceServices(parseInt(id));
    res.status(200).send(cardData);
  } catch (error) {
    res.status(500).send(error);
  }
}
