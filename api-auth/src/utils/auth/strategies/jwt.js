const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');
const moment = require('moment');

const usersService = require('../../../services/users');
const config = require('../../../config/index');

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (tokenPayload, cb) => {
      try {
        const user = await usersService.getUser({
          email: tokenPayload.email
        });

        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        delete user.password;

        if (tokenPayload.exp <= moment().unix()) {
          return cb(boom.unauthorized('El token ha expirado'), false);
        }

        cb(null, { ...user, scopes: tokenPayload.scopes });
      } catch (err) {
        return cb(err);
      }
    }
  )
);
