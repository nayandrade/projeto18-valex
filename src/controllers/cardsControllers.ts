import { Request, Response } from "express";
import * as cardRepository from "../repositories/cardRepository";
import * as cardCreation from "../services/cardCreation";

export async function createCard(req: Request, res: Response) {
  const { apiKey } = res.locals;
  console.log(apiKey);
  try {
    const {
      employeeId,
      type,
    }: { employeeId: number; type: cardRepository.TransactionTypes } = req.body;
    if (!employeeId || !type) {
      return res.sendStatus(422);
    }
    const card = await cardCreation.createCard(employeeId, type, apiKey);
    res.status(201).send({
      message: `Cartão para usuário ${card?.cardholderName} criado com sucesso`,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}