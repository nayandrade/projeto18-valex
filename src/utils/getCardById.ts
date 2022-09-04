import * as cardRepository from "../repositories/cardRepository";

export default async function getCardById(id: number) {
  try {
    const card = cardRepository.findById(id);
    return card;
  } catch (error) {
    throw "Card not found";
  }
}
