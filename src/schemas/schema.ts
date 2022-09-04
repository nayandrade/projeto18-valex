import joi from "joi";

const createCardSchema = joi.object({
  employeeId: joi.number().required(),
  type: joi.string().required(),
});

const activateCardSchema = joi.object({
  securityCode: joi.string().required(),
  password: joi.string().alphanum().length(4).required(),
  number: joi.string().alphanum().length(16).required(),
  cardholderName: joi.string().required(),
  expirationDate: joi.string().required(),
});

const rechargeSchema = joi.object({
  id: joi.number().required(),
  amount: joi.number().greater(0).required(),
});

const paymentschema = joi.object({
  cardId: joi.number().required(),
  businessId: joi.number().required(),
  amount: joi.number().greater(0).required(),
  password: joi.string().alphanum().length(4).required(),
});

const cardHanddlingSchema = joi.object({
    password: joi.string().alphanum().length(4).required(),
  });

export {
    createCardSchema,
    activateCardSchema,
    rechargeSchema,
    paymentschema,
    cardHanddlingSchema,
};
