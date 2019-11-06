const chai = require('chai');
chai.use(require('chai-json-schema'));
const { expect } = chai;
const generator = require('../helpers/generator');

const services = {
  auth: require('../services/auth'),
  guild: require('../services/guild')
};

describe('User Authentication Flow', function() {
  context('Register a new user within a new guild', function() {
    it('Create a new guild', async function() {
      const schema = require('../schemas/guild');
      const guild = generator.guild();
      const { name, discordId, region, discordOwnerId, iconHash } = guild;
      const response = await services.guild.create({
        name,
        discordId,
        region,
        discordOwnerId,
        iconHash
      });

      expect(response.status).to.equal(201, 'Status code is 201');
      expect(response.body).to.be.jsonSchema(schema, 'JSON Schema validated');
      const { payload } = response.body;
      global.guilds.push({ ...guild, id: payload.guild._id });
    });

    it('Register a new user', async function() {
      const schema = require('../schemas/auth.register');
      const user = generator.user();
      const { username } = user;
      const index = global.guilds.length - 1;
      const { discordId } = global.guilds[index];
      const response = await services.auth.register({ username, discordId });

      expect(response.status).to.be.equal(201, 'Status code is 201');
      expect(response.body).to.be.jsonSchema(schema, 'JSON Schema validated');
      const { token, password } = response.body.payload;

      user.accessToken = token;
      user.password = password;
      global.users.push(user);
    });
  });

  context('Register a new user in two differents guilds', function() {
    it('Create a new guild', async function() {
      const schema = require('../schemas/guild');
      const guild = generator.guild();
      const { name, discordId, region, discordOwnerId, iconHash } = guild;
      const response = await services.guild.create({
        name,
        discordId,
        region,
        discordOwnerId,
        iconHash
      });

      expect(response.status).to.equal(201, 'Status code is 201');
      expect(response.body).to.be.jsonSchema(schema, 'JSON Schema validated');
      const { payload } = response.body;
      global.guilds.push({ ...guild, id: payload.guild._id });
    });

    it('Register a new user', async function() {
      const schema = require('../schemas/auth.register');
      const user = generator.user();
      const { username } = user;
      const index = global.guilds.length - 1;
      const { discordId } = global.guilds[index];
      const response = await services.auth.register({ username, discordId });

      expect(response.status).to.be.equal(201, 'Status code is 201');
      expect(response.body).to.be.jsonSchema(schema, 'JSON Schema validated');
      const { token, password } = response.body.payload;

      user.accessToken = token;
      user.password = password;
      global.users.push(user);
    });

    it('Create another guild', async function() {
      const schema = require('../schemas/guild');
      const guild = generator.guild();
      const { name, discordId, region, discordOwnerId, iconHash } = guild;
      const response = await services.guild.create({
        name,
        discordId,
        region,
        discordOwnerId,
        iconHash
      });

      expect(response.status).to.equal(201, 'Status code is 201');
      expect(response.body).to.be.jsonSchema(schema, 'JSON Schema validated');
      const { payload } = response.body;
      global.guilds.push({ ...guild, id: payload.guild._id });
    });

    it('Register the same user for the last guild created', async function() {
      const schema = require('../schemas/auth.register.existing');
      let index = global.users.length - 1;
      const user = global.users[index];
      const { username } = user;

      index = global.guilds.length - 1;
      const { discordId } = global.guilds[index];
      const response = await services.auth.register({ username, discordId });

      expect(response.status).to.be.equal(200, 'Status code is 200');
      expect(response.body).to.be.jsonSchema(schema, 'JSON Schema validated');
    });
  });
});
