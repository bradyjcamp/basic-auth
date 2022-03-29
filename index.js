'use strict';

const app = require('./src/server.js');
const { sequelize } = require('./src/models/index.js');
const PORT = process.env.PORT;

sequelize.sync()
  .then(() => {
    app.start(PORT);
  });
  