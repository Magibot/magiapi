const faker = require('faker');

const guild = () => ({
  name: faker.internet.userName(),
  discordId: faker.random.number(10000),
  region: faker.address.country(),
  discordOwnerId: faker.random.number(100000),
  iconHash: faker.internet.avatar(),
  id: null
});

const user = () => ({
  username: faker.internet.userName(),
  accessToken: null,
  password: null
});

module.exports = {
  guild,
  user
};
