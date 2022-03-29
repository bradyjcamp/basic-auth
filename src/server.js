'use strict';

const express = require('express');
const app = express();
app.use(express.json());


app.use(express.urlencoded({ extended: true }));

module.exports = {
  app,
  start: (PORT) => {
    app.listen(PORT, () => console.log(`server up on ${PORT}`));
  },
};
