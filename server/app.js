const express = require('express');
require('dotenv').config();
const apiV1 = require('./api/v1');
const { sequelize } = require('./api/v1/utils/database_connection');
const Room = require('./api/v1/models/room');
const RoomState = require('./api/v1/models/room');
const RoomType = require('./api/v1/models/room');

const app = express();

app.use(express.json());

app.use('/api/v1', apiV1);

app.use((err, req, res, next) => {
  let { statusCode } = err;
  if (!statusCode) {
    statusCode = 500;
  }
  console.log(err);
  res.status(statusCode).json(err);
});

sequelize
  .authenticate()
  .then(() => {})
  // .then(() => sequelize.sync())
  .then(() => {
    console.log('Listen on port 3000');
    app.listen(3000);
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
