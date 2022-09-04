import * as cardRepository from "../repositories/cardRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import validateCompany from "../utils/validateCompany";
import validateExpiration from "../utils/validateExpiration";

export default async function rechargeServices(
  id: number,
  amount: number,
  apiKey: string
) {
  try {
    const isValidCompany = await validateCompany(apiKey);
    const isValidCard = await cardRepository.findById(id);
    const isExpired = await validateExpiration(isValidCard?.expirationDate);
    if (isValidCompany && isValidCard && !isValidCard.isBlocked && amount > 0 && !isExpired) {
      const cardRecharge = await rechargeRepository.insert({
        cardId: id,
        amount: amount,
      });
      return cardRecharge;
    }
    throw "Card error";

  } catch (error) {
    throw error;
  }
}
