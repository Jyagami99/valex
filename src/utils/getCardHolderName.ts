function getCardHolderName(employeeName: string) {
  const splitted = employeeName.split(" ");
  let cardHolderName = "";

  for (let index = 0; index < splitted.length; index++) {
    const element = splitted[index];

    if (index === 0 || index === splitted.length - 1) {
      cardHolderName += `${element.toUpperCase()}`;
    } else if (element.length >= 3) {
      const initialChar = element.at(0)?.toUpperCase();
      cardHolderName += `${initialChar}`;
    }
  }
  return cardHolderName.trim();
}

export default getCardHolderName;
