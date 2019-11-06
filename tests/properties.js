const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const env = require('./.test.env');

const baseUrl = `http://localhost:${process.env.PORT}`;
const apiVersion = '/api/v1';

module.exports = {
  host: `${baseUrl}${apiVersion}`,
  clientId: env.clientId
};
