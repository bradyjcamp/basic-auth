'use strict';

function handleError404(req, res, next){
  res.status(404).send('not found');
  next();
}

module.exports = handleError404;