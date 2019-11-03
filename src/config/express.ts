import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

import env from './env';

import auth from '../api/v1/auth';
import guild from '../api/v1/guild';
import Logger from '../app/api.logger';

/**
 * Extending the express.Request object
 * to include mongo userId in the application
 * and use this information globally through all routes
 */
declare global {
  namespace Express {
    interface Request {
      userId: string;
      guildId: string;
      playlistId: string;
    }
  }
}

export const createExpressApplication = function() {
  const app: express.Application = express();

  // Enviroment setup
  app.set('port', env.port);

  // Middlewares
  app.use(Logger.ApiConsole.morganInterceptor);

  app.use(compression());
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // Routes
  app.use('/api/v1/auth', auth);
  app.use('/api/v1/guilds', guild);

  return app;
};

export default createExpressApplication;
