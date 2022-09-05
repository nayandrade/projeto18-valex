import dotenv from "dotenv";
import * as cardRepository from "../repositories/cardRepository";
import validateExpiration from "../utils/validateExpiration";
import validateCard from "../utils/validateCard";
import Cryptr from "cryptr";

dotenv.config();
const KEY = process.env.CCV_KEY;

export default async function cardActivationServices(
  securityCode: string,
  password: string,
  number: string,
  cardholderName: string,
  expirationDate: string
) {
  try {
    const card = await checkCard(number, cardholderName, expirationDate);
    const isValid = await validateCard(card.securityCode, securityCode);
    const isExpired = await validateExpiration(card.expirationDate);
    if (card.isBlocked && isValid && !isExpired && !card.password) {
      const cryptr = new Cryptr(`${KEY}`);
      const encriptedPassword = cryptr.encrypt(password);
      const updateCard = await cardRepository.update(card.id, {
        password: encriptedPassword,
        isBlocked: false,
      });
      return;
    }
    throw "Card error";
  } catch (error) {
    throw `${error}`;
  }
}

async function checkCard(
  securityCode: string,
  cardholderName: string,
  expirationDate: string
) {
  try {
    const card = cardRepository.findByCardDetails(
      securityCode,
      cardholderName,
      expirationDate
    );
    return card;
  } catch (error) {
    throw "Card not found";
  }
}
