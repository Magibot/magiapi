const chai = require('../config/chai');
const { expect } = chai;
const generator = require('../helpers/generator');
const properties = require('../properties');

const services = {
  auth: require('../services/auth'),
  guild: require('../services/guild')
};

describe('User authentication flow', function () {
  describe('Registration - POST /auth/register', function () {
    context('Check Client Authorization protection', function () {
      it('Send the request without Authorization header', async function () {
        const schema = require('../schemas/error');
        const response = await chai
          .request(properties.host)
          .post('/auth/register')
          .set({
            'Content-Type': 'application/json'
          })
          .send({
            name: 'Username',
            discord: '12345678910'
          })
          .catch(err => console.error(err));

        expect(response.status).to.equal(401, 'Status code is 401');
        expect(response.body).to.be.jsonSchema(schema, 'JSON Schema validated');
      });
    });

    context('Register a new user in a new guild', function () {
      it('Create a new guild', async function () {
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

      it('Register a new user', async function () {
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

    context('Register the same new user in two differents guilds', function () {
      it('Create a new guild', async function () {
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

      it('Register a new user', async function () {
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

      it('Create another guild', async function () {
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

      it('Register the same user in another guild', async function () {
        const schema = require('../schemas/user');
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

    context('Check validation on register new user', function () {
      it('Send body without `username`', async function () {
        const schema = require('../schemas/error');
        const response = await services.auth.register({
          name: 'Username',
          discordId: '12345678910'
        });

        expect(response.status).to.be.equal(400, 'Status code is 400');
        expect(response.body).to.be.jsonSchema(schema, 'JSON Schema validated');
      });

      it('Send body without `discordId`', async function () {
        const schema = require('../schemas/error');
        const response = await services.auth.register({
          username: 'Username'
        });

        expect(response.status).to.be.equal(400, 'Status code is 400');
        expect(response.body).to.be.jsonSchema(schema, 'JSON Schema validated');
      });

      it('Send body without `username` and `discordId`', async function () {
        const schema = require('../schemas/error');
        const response = await services.auth.register({
          name: 'Username',
          discord: '12345678910'
        });

        expect(response.status).to.be.equal(400, 'Status code is 400');
        expect(response.body).to.be.jsonSchema(schema, 'JSON Schema validated');
      });
    });

    context(
      'Check if unique `username` and `discordId` is being respected',
      function () {
        it('Create a new guild', async function () {
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
          expect(response.body).to.be.jsonSchema(
            schema,
            'JSON Schema validated'
          );
          const { payload } = response.body;
          global.guilds.push({ ...guild, id: payload.guild._id });
        });

        it('Register a new user', async function () {
          const schema = require('../schemas/auth.register');
          const user = generator.user();
          const { username } = user;
          const index = global.guilds.length - 1;
          const { discordId } = global.guilds[index];
          const response = await services.auth.register({
            username,
            discordId
          });

          expect(response.status).to.be.equal(201, 'Status code is 201');
          expect(response.body).to.be.jsonSchema(
            schema,
            'JSON Schema validated'
          );
          const { token, password } = response.body.payload;

          user.accessToken = token;
          user.password = password;
          global.users.push(user);
        });

        it('Send a registered user and guild for user registration', async function () {
          const schema = require('../schemas/error');
          let index = global.users.length - 1;
          const user = global.users[index];
          const { username } = user;
          index = global.guilds.length - 1;
          const { discordId } = global.guilds[index];

          const response = await services.auth.register({
            username,
            discordId
          });

          expect(response.status).to.be.equal(409, 'Status code is 409');
          expect(response.body).to.be.jsonSchema(
            schema,
            'JSON Schema validated'
          );
        });
      }
    );
  });

  describe('Login - POST /auth/login', function () {
    context('Authenticate a user after registration', function () {
      it('Register a new user', async function () {
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

      it('Login with the registered user', async function () {
        let index = global.users.length - 1;
        const user = global.users[index];
        const { username, password } = user;

        const response = await services.auth.login({ username, password });
        expect(response.status).to.be.equal(201, 'Status code is 201');
        // expect(response.body).to.be.jsonSchema(schema, 'JSON Schema validated');
        const { token } = response.body.payload;
        global.users[index].token = token;
      })
    });
  });
});
