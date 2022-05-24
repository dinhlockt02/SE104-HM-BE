const express = require('express');
require('dotenv').config();
const cors = require('cors');
const apiV1 = require('./api/v1');
const { sequelize } = require('./api/v1/utils/database_connection');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', apiV1);

app.use((err, req, res, next) => {
  let { statusCode } = err;
  if (!statusCode) {
    statusCode = 500;
  }
  console.log(err);
  res.status(statusCode).json(err + err.message);
});

sequelize
  .authenticate()
  .then(() => {})
  // .then(() => sequelize.sync())
  .then(() => {
    console.log('Listen on port 3000');
    app.listen(process.env.SERVER_PORT);
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
