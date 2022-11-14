const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const bcrypt = require('bcryptjs');
const boom = require('@hapi/boom');

const usersService = require('../../../services/users');

/*
    Authentication with passport usign basic strategy
*/

passport.use(
  new BasicStrategy(async (username, password, cb) => {
    try {
      const user = await usersService.getUser({ username });

      if (!user) {
        return cb(boom.unauthorized(), false);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }

      delete user.password;

      return cb(null, user);
    } catch (err) {
      cb(err);
    }
  })
);
