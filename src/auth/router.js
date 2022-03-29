'use strict';
//----auth.js is his router.js in demo code

const express = require('express');

const { Users } = require('./models/users-model');
const basicAuth = require('./middleware/basic.js');

const router = express.Router();

const app = express();

app.use(express.json());


router.post('/signup', async (req, res) => {
  try {
    const record = await Users.create(req.body);
    res.status(201).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});

router.post('/signin', basicAuth, (req, res) => {
  const { user } = req;
  res.status(200).json(user);
});

module.exports = router;