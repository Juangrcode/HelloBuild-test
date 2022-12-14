const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    username: String,
    password: String
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('User', userSchema, 'users');
