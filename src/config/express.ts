import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';

import env from './env';
import api from '../api';

import Logger from "../app/api.logger";
import { IGuild } from '../models/guild.model';

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
      guild: IGuild | null | undefined;
    }
  }
}

export const createExpressApplication = function() {
  const app: express.Application = express();

  // Enviroment setup
  app.set('port', env.port);
  app.set('tokenExpirationTime', env.tokenExpirationTime);
  
  // Middlewares
  app.use(Logger.ApiConsole.morganInterceptor);
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // Routes
  app.use('/api', api);

  return app;
};

export default createExpressApplication;
