import * as paymentRepository from "../repositories/paymentRepository";

export default async function paymentServices(
  cardId: number,
  businessId: number,
  amount: number
) {
  try {
    const paymentData = await paymentRepository.insert({
      cardId,
      businessId,
      amount,
    });
    return paymentData;
  } catch (error) {
    throw "deu ruim no pagamento";
  }
}
