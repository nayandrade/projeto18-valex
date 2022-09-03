import { Request, Response } from "express";
import * as cardRepository from "../repositories/cardRepository";
import cardCreationServices from "../services/cardCreationServices";
import cardActivationServices from "../services/cardActivationServices";

export async function createCard(req: Request, res: Response) {
  const { apiKey } = res.locals;
  //middleware
  const {
    employeeId,
    type,
  }: { employeeId: number; type: cardRepository.TransactionTypes } = req.body;
  if (!employeeId || !type) {
    return res.sendStatus(422);
  }
  console.log(apiKey);
  //
  try {
    const card = await cardCreationServices(employeeId, type, apiKey);
    res.status(201).send({
      message: `Cartão para usuário ${card?.cardholderName} criado com sucesso`,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function activateCard(req: Request, res: Response) {
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
  if (!securityCode || !password || !number || !cardholderName || !expirationDate) {
    return res.sendStatus(422);
  }

  try {
    const activatedCard = await cardActivationServices(
      securityCode,
      password,
      number,
      cardholderName,
      expirationDate
    );
    res.status(201).send({
      message: `Cartão para usuário ${cardholderName} ativado com sucesso`,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}
