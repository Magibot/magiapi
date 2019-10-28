import Logger from './app/api.logger';
import http from 'http';
import createExpressApplication from './config/express';
import { createMongooseConnection } from './config/mongoose';

const app = createExpressApplication();
const mongoose = createMongooseConnection();
const port = app.get('port');

http.createServer(app).listen(port, function() {
  Logger.ApiConsole.normal('Starting Magibot API');
  Logger.ApiConsole.success(`Server listening on port ${port}`);
});
