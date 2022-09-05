import Joi from "joi";

function customMessageForRegex(field: string, characters: number) {
  return `${field} must be ${characters} characters long containing only numbers.`;
}

const cardActivationSchema = Joi.object({
  id: Joi.number().required(),
  cvc: Joi.string()
    .length(3)
    .pattern(/^[0-9]+$/)
    .messages({ "string.pattern.base": customMessageForRegex("CVC", 3) })
    .required(),
  password: Joi.string()
    .length(4)
    .pattern(/^[0-9]+$/)
    .messages({ "string.pattern.base": customMessageForRegex("Password", 4) })
    .required(),
});

export default cardActivationSchema;
