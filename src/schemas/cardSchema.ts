import Joi from "joi";

const cardSchema = Joi.object({
  employeeId: Joi.number().required(),
  isVirtual: Joi.boolean(),
  originalCardId: Joi.number(),
  type: Joi.number()
    .required()
    .valid("groceries", "restaurant", "transport", "education", "health"),
});

export default cardSchema;
