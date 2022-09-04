import Cryptr from "cryptr";
import dotenv from "dotenv";
import * as paymentRepository from "../repositories/paymentRepository";
import * as cardRepository from "../repositories/cardRepository";
import * as businessRepository from "../repositories/businessRepository";
import * as rechargesRepository from "../repositories/rechargeRepository";
import validateExpiration from "../utils/validateExpiration";

dotenv.config();
const KEY = process.env.CCV_KEY;

export default async function paymentServices(
  cardId: number,
  businessId: number,
  amount: number,
  password: string
) {
  try {
    const card = await cardRepository.findById(cardId);
    if (!card || card.isBlocked || !card.password) {
      throw "Card error";
    }
    const checkBalance = await validateBalance(cardId, amount);
    if(!checkBalance) {
      throw "Unauthorized"
    }

    const isValid = validateExpiration(card.expirationDate);
    if (!isValid) {
      throw "Card is expired";
    }
    const checkPassword = validatePassword(password, card.password);
    if (!checkPassword) {
      throw "Incorrect password";
    }
    const checkBusiness = await validateBusiness(businessId, card.type);
    if (!checkBusiness) {
      throw "Business error";
    }

    await paymentRepository.insert({
      cardId,
      businessId,
      amount,
    });

  } catch (error) {
    throw error;
  }
}

function validatePassword(password: string, dbPassword: string) {
  const cryptr = new Cryptr(`${KEY}`);
  const decryptedPassword = cryptr.decrypt(dbPassword);
  if (decryptedPassword !== password) {
    return false;
  }
  return true;
}

async function validateBusiness(businessId: number, type: string) {
  const business = await businessRepository.findById(businessId);
  if (business.type === type) {
    return true;
  }
  return false;
}

async function validateBalance(cardId: number, purchaseAmount: number) {
  if(purchaseAmount <= 0) {
    return false
  }
  try {
    let debt: number = 0;
    let credit: number = 0
    const debtData = await paymentRepository.findByCardId(cardId);
    debtData?.map((e) => {
      const amount = e.amount;
      debt += amount;
    });
    const creditData = await rechargesRepository.findByCardId(cardId);
    creditData?.map((e) => {
      const amount = e.amount
      credit += amount
    })
    const total = debt + purchaseAmount
    if(credit >= total) {
      return true
    }
    return false
  } catch (error) {
    throw error
  }
}
