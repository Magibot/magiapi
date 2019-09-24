import http from 'http';
import createExpressApplication from './config/express';

const app = createExpressApplication();
const port = app.get('port');

http.createServer(app).listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
