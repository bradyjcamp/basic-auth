'use strict';

const { Users, sequelize } = require('../src/auth/models/users-model');
const jwt = require('jsonwebtoken');


const SECRET = process.env.API_SECRET || 'secretfortoken';

beforeAll(async () => {
  await sequelize.sync();
});
afterAll(async () => {
  await sequelize.drop();
});

describe('testing the user model',  () => {
  test('User should have token', async ()=> {
    const testUser = await Users.create({ username: 'Brady', password: 'secretpassword'});
    console.log(testUser.token);
    const { token } = testUser; //setter runs and its return value gets used

    expect(testUser.token).toBeTruthy();
    expect(jwt.verify(token, SECRET)).toBeTruthy();
  });
});