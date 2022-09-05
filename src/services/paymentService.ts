import dotenv from "dotenv";
import {
  Card,
  findByCardDetails,
  findById,
} from "../repositories/cardRepository";
import { findById as findBusinessById } from "../repositories/businessRepository";
import {
  insert,
  OnlinePayment,
  PaymentInsertData,
} from "../repositories/paymentRepository";
import notFound from "../utils/notFound";
import errorFactory from "../utils/error";
import isExpired from "../utils/isExpired";
import bcrypt from "bcrypt";
import getCardBalance from "../utils/getCardBalance";
import Cryptr from "cryptr";

dotenv.config();

const CRYPTR_SECRET = process.env.CRYPTR_SECRET || "secret";
const cryptr = new Cryptr(CRYPTR_SECRET);

function validateCard(cardData: Card) {
  if (cardData.isBlocked)
    throw errorFactory("blocked_card", "O seu cartão está bloqueado.");

  if (isExpired(cardData.expirationDate))
    throw errorFactory("expired_card", "O seu cartão expirou.");
}

async function createPayments(
  paymentData: PaymentInsertData,
  cardPassword: string
) {
  const cardData = await findById(paymentData.cardId);
  if (!cardData) throw notFound("Card");

  const businessesData = await findBusinessById(paymentData.businessId);
  if (!businessesData) throw notFound("Business");

  if (businessesData.type !== cardData.type)
    throw errorFactory("invalid_type", "O seu cartão não pode ser usado aqui.");

  validateCard(cardData);

  if (!cardData.password)
    throw errorFactory(
      "inactive_card",
      "Você deve ativar seu cartão antes de começar a utilizá-lo."
    );

  const correctPassword = await bcrypt.compare(cardPassword, cardData.password);
  if (!correctPassword)
    throw errorFactory(
      "invalid_password",
      "Não foi possível corresponder à palavra-chave especificada."
    );

  const cardBalance = await getCardBalance(paymentData.cardId);
  if (Number(cardBalance.balance) < paymentData.amount)
    throw errorFactory(
      "insufficient_balance",
      "O seu cartão não tem saldo suficiente para completar este pagamento."
    );

  await insert(paymentData);
}

async function createOnlinePayments(paymentData: OnlinePayment) {
  const cardData = await findByCardDetails(
    paymentData.number,
    paymentData.cardholderName,
    paymentData.expirationDate
  );
  if (!cardData) throw notFound("Card");

  const decryptedCVC = cryptr.decrypt(cardData.securityCode);
  if (decryptedCVC !== paymentData.securityCode)
    throw errorFactory(
      "invalid_security_code",
      "Não foi possível corresponder ao código de segurança especificado"
    );

  const businessData = await findBusinessById(paymentData.businessId);
  if (!businessData) throw notFound("Business");

  if (businessData.type !== cardData.type)
    throw errorFactory("invalid_type", "O seu cartão não pode ser usado aqui");

  validateCard(cardData);

  if (!cardData.password)
    throw errorFactory(
      "inactive_card",
      "Você deve ativar seu cartão antes de começar a utilizá-lo.."
    );

  const cardBalance = await getCardBalance(cardData.id);
  if (Number(cardBalance.balance) < paymentData.amount)
    throw errorFactory(
      "insufficient_balance",
      "O seu cartão não tem saldo suficiente para completar este pagamento."
    );

  await insert({
    cardId: cardData.id,
    businessId: businessData.id,
    amount: paymentData.amount,
  });
}

export default {
  createPayments,
  createOnlinePayments,
};
