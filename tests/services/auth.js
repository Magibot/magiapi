const properties = require('../properties');
const chai = require('../config/chai');

const register = async user => {
  const response = await chai
    .request(properties.host)
    .post('/auth/register')
    .set({
      Authorization: properties.clientId,
      'Content-Type': 'application/json'
    })
    .send(user)
    .catch(err => console.error(err));

  return response;
};

module.exports = { register };
