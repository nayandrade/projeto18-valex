import * as paymentRepository from "../repositories/paymentRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import * as cardRepository from "../repositories/cardRepository"

interface DebtItem {
    id: number; cardId: number; businessId: number, businessName: string, timestamp: Date, amount: number
}
interface Debt extends Array<DebtItem>{}

interface CreditItem {
    id: number; cardId: number; timestamp: Date, amount: number
}
interface Credir extends Array<CreditItem>{}

export default async function cardBalanceServices(id: number) {
  try {
    const card = await cardRepository.findById(id);
    if (!card) {
      throw "Card not found";
    }
    const debtData = await paymentRepository.findByCardId(id);
    const creditData = await rechargeRepository.findByCardId(id);
    const balance = checkBalance(debtData, creditData);

    return {
      balance: balance,
      transactions: {
        ...debtData,
      },
      recharges: {
        ...creditData,
      },
    };
  } catch (error) {
    throw error;
  }
}

function checkBalance(debtData: Debt, creditData: Credir) {
  let debt: number = 0;
  let credit: number = 0;
  debtData?.map((e) => {
    const amount = e.amount;
    debt += amount;
  });
  creditData?.map((e) => {
    const amount = e.amount;
    credit += amount;
  });
  return credit - debt;
}
