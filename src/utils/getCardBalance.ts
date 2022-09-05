import { findByCardId as findPaymentsByCardId } from "../repositories/paymentRepository";
import { findByCardId as findRechargesByCardId } from "../repositories/rechargeRepository";

function getTotalAmount(rows: any[]) {
  const total = rows.reduce((prev, current) => prev + current.amount, 0);
  return total;
}

export default async function getCardBalance(cardId: number) {
  const payments = await findPaymentsByCardId(cardId);
  const recharges = await findRechargesByCardId(cardId);
  const balance = getTotalAmount(recharges) - getTotalAmount(payments);

  return {
    balance,
    transactions: payments,
    recharges,
  };
}
