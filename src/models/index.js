'use strict';

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL || 'postgresql://localhost:5432/basic-auth';

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});



module.exports = { sequelize, DataTypes };


