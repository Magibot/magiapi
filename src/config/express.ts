import env from './env';
import express from 'express';

// Express middlewares
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import Logger from '../app/api.logger';

import ApiResponse from '../app/api.response';
import errorTypes from '../app/types/errors';

// Routes
import api from '../api';

// Models
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

  app.use(compression());
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // Routes
  app.use('/api', api);

  // Handle route not found
  app.use((request, response, next) => {
    const apiResponse = new ApiResponse();
    apiResponse.addError({
      type: errorTypes.internal.notimplemented,
      message: 'Operation is not implemented',
      kind: 'internal.notimplemented'
    });
    return response.status(501).json(apiResponse.json());
  });

  return app;
};

export default createExpressApplication;
