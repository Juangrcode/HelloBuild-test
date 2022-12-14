const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const apiKeySchema = Schema(
  {
    token: String,
    scopes: [String]
  },
  { versionKey: false }
);

module.exports = mongoose.model('ApiKey', apiKeySchema, 'api-keys');
