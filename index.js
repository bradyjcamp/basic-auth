'use strict';

const server = require('./src/server.js');
const { sequelize } = require('./src/models/index.js');
const PORT = process.env.PORT;

sequelize.sync()
  .then(() => {
    server.start(PORT);
  });
  