'use strict';

const express = require('express');
const authRouter = require('./auth/router');
const userRouter = require('./auth/users');
const app = express();
app.use(express.json());


//add routing

//add any middleware

//where do we configure CRUD things

app.use(express.urlencoded({ extended: true }));
app.use(authRouter);
app.use(userRouter);

module.exports = {
  app,
  start: (PORT) => {
    app.listen(PORT, () => console.log(`server up on ${PORT}`));
  },
};
