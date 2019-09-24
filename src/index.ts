import http from 'http';
import createExpressApplication from './config/express';
import mongoose from './config/mongoose';

const app = createExpressApplication();
const port = app.get('port');

http.createServer(app).listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
