import dotenv from 'dotenv';
import { envSchema } from '../consts/validate.const';

dotenv.config();

const { error, value: envVars } = envSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  console.error('❌ ENV Validation Error:', error.details);
  process.exit(1);
}

const config = {
  port: Number(envVars.PORT),
  nodeEnv: envVars.NODE_ENV,
  mongoUri: envVars.MONGO_URI,
  emailUser: envVars.EMAIL_USER,
  emailPassword: envVars.EMAIL_PASS,
  redisEnpoint: envVars.REDIS_ENDPOINT,
  redisPort: envVars.REDIS_PORT,
  redisUserName: envVars.REDIS_USERNAME,
  redisPassword: envVars.REDIS_PASSWORD,
  jwtSecret: envVars.JWT_SECRET,
  jwtRefreshSecret: envVars.JWT_REFRESH_SECRET,
};

export default config;
