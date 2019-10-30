import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env') });

class Configuration {
  port: number = 3030;
  tokenSecret: string = '';
  mongoUri: string = '';

  tokenExpirationTime: number = 3600;
  daysToExpireTemporaryPassword: number = 3;
}

const config: Configuration = new Configuration();

const requiredVariables = ['PORT', 'TOKEN_SECRET', 'MONGODB_URI'];

for (let i = 0; i < requiredVariables.length; i++) {
  const v = requiredVariables[i];
  if (!process.env[v]) {
    console.log('Missing environment variables');
    process.exit(1);
  }
}

const {
  PORT,
  TOKEN_SECRET,
  MONGODB_URI,
  TOKEN_EXPIRATION_TIME,
  DAYS_EXPIRE_TEMPORARY_PASSWORD
} = process.env;

config.port = PORT ? parseInt(PORT) : config.port;
config.tokenSecret = TOKEN_SECRET ? TOKEN_SECRET : '';
config.mongoUri = MONGODB_URI ? MONGODB_URI : '';

config.tokenExpirationTime = TOKEN_EXPIRATION_TIME
  ? parseInt(TOKEN_EXPIRATION_TIME)
  : config.tokenExpirationTime;

config.daysToExpireTemporaryPassword = DAYS_EXPIRE_TEMPORARY_PASSWORD
  ? parseInt(DAYS_EXPIRE_TEMPORARY_PASSWORD)
  : config.daysToExpireTemporaryPassword;

export default config;
