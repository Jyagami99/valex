import joi from "joi";

const paymentSchema = joi.object({
  cardId: joi.number().required(),
  businessId: joi.number().required(),
  password: joi
    .string()
    .pattern(/^[0-9]+$/)
    .length(4)
    .required(),
  amount: joi.number().min(1).required(),
});

export default paymentSchema;
