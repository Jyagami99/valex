import {
  findById,
  findByTypeAndEmployeeId,
  insert,
  TransactionTypes,
  update,
} from "../respositories/cardRepository";
import { findByApiKey } from "../respositories/companyRepository";
import { findById as findEmployeeById } from "../respositories/employeeRepository";
import { faker } from "@faker-js/faker";
import errorFactory from "../utils/error";
import notFound from "../utils/notFound";
import getCardHolderName from "../utils/getCardHolderName";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import isExpired from "../utils/isExpired";

const CRYPTR_SECRET = process.env.CRYPTR_SECRET || "some secret";
const cryptr = new Cryptr(CRYPTR_SECRET);

async function createCards(
  apiKey: string,
  cardData: {
    employeeId: number;
    password: string;
    isVirtual: boolean | undefined;
    originalCardId: number | undefined;
    type: TransactionTypes;
  }
) {
  const validCompany = await findByApiKey(apiKey);
  if (!validCompany) throw notFound("Company");

  const { employeeId, type, password, isVirtual, originalCardId } = cardData;

  const employeeData = await findEmployeeById(employeeId);
  if (!employeeData) throw notFound("Employee");

  const employeeCardWithSameType = await findByTypeAndEmployeeId(
    type,
    employeeId
  );
  if (employeeCardWithSameType)
    throw errorFactory(
      "limit_reached",
      "The employee can only have one card of each type."
    );

  const number = faker.finance.creditCardNumber("visa");
  const cardholderName = getCardHolderName(employeeData.fullName);
  const expirationDate = dayjs().add(5, "years").format("MM/YY");
  const securityCode = cryptr.encrypt(faker.finance.creditCardCVV());

  const newCardData = {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password,
    isVirtual: isVirtual !== undefined ? isVirtual : false,
    originalCardId,
    isBlocked: false,
    type,
  };

  await insert(newCardData);
}

async function activateCard(data: {
  id: number;
  cvc: string;
  password: string;
}) {
  const { id, cvc, password } = data;

  const cardData = await findById(id);
  if (!cardData) throw notFound("Card");

  if (cardData.password)
    throw errorFactory("conflict", "Your card has already been activated.");
  if (isExpired(cardData.expirationDate))
    throw errorFactory("card_expired", "your card has expired.");

  const decryptedCVC = cryptr.decrypt(cardData.securityCode);
  console.log("decryptedCVC ", decryptedCVC);

  if (cvc !== decryptedCVC)
    throw errorFactory(
      "invalid_security_code",
      "Could not match the specified security code."
    );

  const toUpdate = { password: bcrypt.hashSync(password, 10) };
  await update(id, toUpdate);
}

export default {
  createCards,
  activateCard,
};
