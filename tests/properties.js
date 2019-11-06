const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

const baseUrl =
  process.env.NODE_ENV === 'ci'
    ? 'http://magi-api.herokuapp.com/'
    : `http://localhost:${process.env.PORT}`;
const apiVersion = '/api/v1';

module.exports = {
  host: `${baseUrl}${apiVersion}`,
  clientId: process.env.TEST_CLIENT_ID
};
