import * as paymentRepository from "../repositories/paymentRepository";
import * as cardRepository from "../repositories/cardRepository";

export default async function transactionServices(id: number) {
  try {
    const isValidCard = await cardRepository.findById(id);
    if (!isValidCard) {
      throw "Card not found";
    }
    const cardTransactions = await paymentRepository.findByCardId(
      isValidCard.id
    );
    return cardTransactions;
  } catch (error) {
    throw "card not found";
  }
}
