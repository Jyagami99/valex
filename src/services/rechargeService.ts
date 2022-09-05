import { findById } from "../repositories/cardRepository";
import { findByApiKey } from "../repositories/companyRepository";
import { RechargeInsertData, insert } from "../repositories/rechargeRepository";
import errorFactory from "../utils/error";
import isExpired from "../utils/isExpired";
import notFound from "../utils/notFound";

async function createRecharges(
  apiKey: string,
  rechargeData: RechargeInsertData
) {
  const companyData = await findByApiKey(apiKey);
  if (!companyData) throw notFound("Company");

  const cardData = await findById(rechargeData.cardId);
  if (!cardData) throw notFound("Card");

  if (cardData.isBlocked)
    throw errorFactory("blocked_card", "O seu cartão está bloqueado.");
  if (isExpired(cardData.expirationDate))
    throw errorFactory("expired_card", "O seu cartão expirou.");

  await insert(rechargeData);
}

export default {
  createRecharges,
};
