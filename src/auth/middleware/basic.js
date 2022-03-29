'use strict';

const base64 = require('base-64');
const { Users } = require('../models/users-model');

module.exports = async (req, res, next) => {
  try{
    let basicHeaderParts = req.headers.authorization.split(' '); 
    let encodedString = basicHeaderParts.pop(); 
    let decodedString = base64.decode(encodedString); 
    let [username, password] = decodedString.split(':'); 

    let validUser = await Users.authenticateBasic(username, password);
    req.user= validUser;
    next();
  }catch(err){
    console.error(err);
    next(err);
  }
};