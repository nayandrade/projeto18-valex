import dotenv from "dotenv";
import * as cardRepository from "../repositories/cardRepository";
import validateExpiration from "../utils/validateExpiration"
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
    if (card.isBlocked && isValid && !isExpired ) { // && card.password === null
      const cryptr = new Cryptr(`${KEY}`);
      const encriptedPassword = cryptr.encrypt(password);
      const updateCard = await cardRepository.update(card.id, {
        password: encriptedPassword,
        isBlocked: false,
      });
      return 'atualizou'
    }
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

async function validateCard(dbSecurityCode: string, securityCode: string) {
  const cryptr = new Cryptr(`${KEY}`);
  const decryptedString = cryptr.decrypt(dbSecurityCode);
  if (decryptedString === securityCode) {

    return true;
  }
  throw "Card information is invalid";
}

// async function validateExpiration(expirationDate: string) {
//   const today = dayjs(new Date()).format("MM/YY").toString();
//   const todayArray = today.split("/");
//   const expirationDateArray = expirationDate.split("/");
//   if (parseInt(todayArray[1]) < parseInt(expirationDateArray[1])) {
//     return false;
//   }
//   if (
//     parseInt(todayArray[0]) < parseInt(expirationDateArray[0]) &&
//     parseInt(todayArray[1]) === parseInt(expirationDateArray[1])
//   ) {
//     return false;
//   }
//   return true;
// }
