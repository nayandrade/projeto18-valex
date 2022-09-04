import * as cardRepository from "../repositories/cardRepository";
import validateExpiration from "../utils/validateExpiration";
import getCardById from "../utils/getCardById";
import validatePassword from "../utils/validatePassword";

export default async function unlockCardServices(password: string, id: number) {
  try {
    const card = await getCardById(id);
    if (!card || !card.isBlocked || !card.password) {
      throw "Card error";
    }
    const isExpired = await validateExpiration(card.expirationDate);
    const checkPassword = await validatePassword(password, card.password);

    if (!checkPassword || isExpired) {
        throw "Unauthorized"
    }

    await cardRepository.update(card.id, {
      isBlocked: false,
    });

  } catch (error) {
    throw `${error}`;
  }
}
