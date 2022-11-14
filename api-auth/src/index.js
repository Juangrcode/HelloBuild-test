// Express
const express = require('express');
const cors = require('cors');
const app = express();

const config = require('./config/index');
const routes = require('./routes/index');
const MongooseLib = require('./lib/mongoose');

const {
  wrapErrors,
  errorHandler
} = require('./utils/middlewares/errorHandler');
const { notFoundHandler } = require('./utils/middlewares/notFoundHandler');

// Connect database
if (!module.parent) {
  const mongooseLib = new MongooseLib();
  mongooseLib.connect();
}

// Middlewares
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
routes(app);

// Catch 404
app.use(notFoundHandler);

// Errors middlewares
app.use(wrapErrors);
app.use(errorHandler);

if (!module.parent) {
  // Server
  app.listen(config.port, () => {
    console.log(`Listening in http://localhost:${config.port}`);
  });
}

module.exports = app;
