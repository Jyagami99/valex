import dayjs from "dayjs";
import errorFactory from "./error";

function isExpired(expirationDateString: string) {
  const expirationMonth = expirationDateString.split("/")[0];
  const expirationYear = expirationDateString.split("/")[1];

  if (!expirationMonth || !expirationYear)
    throw errorFactory(
      "invalid_expiration_date",
      "Expiration date must be  formatted as 'mm/yy'"
    );

  const now = dayjs();
  const expirationDate = dayjs()
    .set("months", Number(expirationMonth))
    .set("years", Number(expirationYear));

  if (!expirationDate.isValid())
    throw errorFactory(
      "invalid_expiration_date",
      "Expiration date must be formatted as 'mm/yy'"
    );

  return expirationDate.unix() >= now.unix();
}

export default isExpired;
