const properties = require('../properties');
const chai = require('../config/chai');

const create = async guild => {
  const response = await chai
    .request(properties.host)
    .post('/guilds')
    .set({
      Authorization: properties.clientId,
      'Content-Type': 'application/json'
    })
    .send(guild)
    .catch(err => console.error(err));

  return response;
};

module.exports = { create };
