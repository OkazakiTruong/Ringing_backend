import Joi from 'joi';

export const envSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  MONGO_URI: Joi.string().uri().required(),
  EMAIL_USER: Joi.string().email().required(),
  EMAIL_PASS: Joi.string().min(6).required(),
  REDIS_ENDPOINT: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_USERNAME: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().required()
}).unknown();

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
