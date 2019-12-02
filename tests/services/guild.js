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

const byId = async (id, type) => {
  const response = await chai
    .request(properties.host)
    .get(`/guilds/${id}`)
    .query({ typeId: type })
    .set({
      Authorization: properties.clientId
    })
    .send()
    .catch(err => console.error(err));

  return response;
};

const update = async (id, type, guild) => {
  const response = await chai
    .request(properties.host)
    .put(`/guilds/${id}`)
    .query({ typeId: type })
    .set({
      Authorization: properties.clientId,
      'Content-Type': 'application/json'
    })
    .send(guild)
    .catch(err => console.error(err));

  return response;
};

const edit = async (id, type, document) => {
  const response = await chai
    .request(properties.host)
    .patch(`/guilds/${id}`)
    .query({ typeId: type })
    .set({
      Authorization: properties.clientId,
      'Content-Type': 'application/json'
    })
    .send(document)
    .catch(err => console.error(err));

  return response;
};

const destroy = async (id, type) => {
  const response = await chai
    .request(properties.host)
    .delete(`/guilds/${id}`)
    .query({ typeId: type })
    .set({
      Authorization: properties.clientId
    })
    .send()
    .catch(err => console.error(err));

  return response;
};

module.exports = { create, byId, update, edit, destroy };
