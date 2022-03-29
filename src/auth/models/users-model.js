'use strict';

const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const SECRET = process.env.API_SECRET || 'secretfortoken';

// const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL || 'postgresql://localhost:5432/basic-auth';

const sequelize = new Sequelize(process.env.DATABASE_URL || 'sqlite::memory');

const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.VIRTUAL,
    get() {
      return jwt.sign({ username: this.username }, SECRET);// function runs everytime you try and 'read' from this property
    }, 
    set(payload) {
      return jwt.sign(payload, SECRET);
    },
  },
});

Users.beforeCreate(async (instance) => {
  instance.password = await bcrypt.hash(instance.password, 10);
});
//----keep in mind function names
Users.authenticateBasic = async function(username, password){
  try{
    const user = await Users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if(valid){
      return user;
    }
  }catch(err){
    console.log(err);
    return err;
  }
};

Users.authenticateBearer = async function (token) {
  try {
    let payload = jwt.verify(token, SECRET);
    let user = await this.findOne({where: { username: payload.username }});
    if (user) {
      return user;
    }
  } catch (e) {
    console.error(e);
    return e;
  }
};

module.exports = { 
  Users,
  sequelize,
};