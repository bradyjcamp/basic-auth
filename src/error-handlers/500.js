'use strict';

function handleError500(req, res, next){
  res.status(500).send('query parameters error');
  next();
}

module.exports = handleError500;