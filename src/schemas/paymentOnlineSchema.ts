import joi from "joi";

const paymentOnlineSchema = joi.object({
  number: joi.string().required(),
  cardholderName: joi.string().required(),
  expirationDate: joi.string().required(),
  securityCode: joi
    .string()
    .pattern(/^[0-9]+$/)
    .length(3)
    .required(),
  businessId: joi.number().required(),
  amount: joi.number().min(1).required(),
});

export default paymentOnlineSchema;
