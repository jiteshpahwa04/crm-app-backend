import dotenv from 'dotenv';
dotenv.config();

export const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
};
