import Joi from 'joi';

export const authSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  birthDay: Joi.date().required(),
  phone: Joi.number().required(),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
