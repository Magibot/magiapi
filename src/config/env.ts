import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env') });

class Configuration {
  port: string = '';
  tokenSecret: string = '';
  mongoUri: string = '';
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

config.port = process.env.PORT ? process.env.PORT : '';
config.tokenSecret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : '';
config.mongoUri = process.env.MONGODB_URI ? process.env.MONGODB_URI : '';

export default config;
