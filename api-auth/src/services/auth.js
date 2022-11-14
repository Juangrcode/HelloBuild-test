const config = require('../config');

const moment = require('moment');

const jwt = require('jsonwebtoken');

const signToken = async ({ id, username, apiKey }) => {
  const payload = {
    sub: id,
    username,
    scopes: apiKey.scopes,
    iat: moment().unix(),
    exp: moment().add(60, 'days').unix()
  };

  // Create JWT with expires
  const token = jwt.sign(payload, config.authJwtSecret);

  return { token, user: { id, username } };
};

module.exports = { signToken };
