/* eslint-disable no-console */
const mongoose = require('mongoose');
const config = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongooseLib {
  constructor() {}

  async connect() {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    await mongoose
      .connect(MONGO_URI, options)
      .then(() =>
        console.log(
          `[db] Connect success in mongodb+srv://${USER}:password@host/${DB_NAME}`
        )
      )
      .catch((err) => console.error(`[db] ${err}`));
  }
}

module.exports = MongooseLib;
