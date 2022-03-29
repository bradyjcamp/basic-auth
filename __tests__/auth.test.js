'use strict';

const { server } = require('../src/server');
const { sequelize } = require('../src/auth/models/users-model');
const base64 = require('base-64');
const supertest = require('supertest');
const request = supertest(server);

beforeAll(async () => {
  await sequelize.sync();
});
afterAll(async () => {
  await sequelize.drop();
});

describe('testing our auth features', () => {

  test('Should allow users to signup, with a POST to `signup', async () => {
    let response = await request.post('/signup').send({
      username: 'brady',
      password: 'secretpassword',
    });

    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('brady');
    expect(response.body.password).toBeTruthy();
    expect(response.body.password).not.toEqual('secretpassword');
  });

  test('should allow a user to `signin` with the correct password', async () => {
    let authString = 'brady:secretpassword';
    let encodedString = base64.encode(authString);
    let response = await request.post('/signin').set('Authorization', `Basic ${encodedString}`);

    console.log(response.error);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('brady');
  });
});