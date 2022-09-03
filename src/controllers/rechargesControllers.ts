import { Request, Response } from "express";
import rechargeServices from "../services/rechargeServices";

export async function cardRecharge(req: Request, res: Response) {
  const { apiKey } = res.locals;
  const { id, amount }: { id: number; amount: number } = req.body;
  try {
    const rechargeData = await rechargeServices(id, amount, apiKey);
    res.status(200).send(rechargeData);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
