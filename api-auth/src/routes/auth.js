// Express
const express = require('express');
const router = express.Router();

// Auth
const passport = require('passport');

// Services
const apiKeysService = require('../services/apiKeys');
const usersService = require('../services/users');
const authService = require('../services/auth');

// Schemas
const { createUserSchema } = require('../utils/schemas/users');

// Responses
const boom = require('@hapi/boom');
const response = require('../utils/response');

// Basic strategy middleware
require('../utils/auth/strategies/basic');
const validation = require('../utils/middlewares/validationHandler');

// Sign-in
router.post('/sign-in', async (req, res, next) => {
  const { apiKeyToken } = req.body;
  console.log({ apiKeyToken });
  if (!apiKeyToken) {
    next(boom.unauthorized('apiKeyToken is required'));
  }

  // Create passport Authentication, verify if password is the correct
  passport.authenticate('basic', (err, user) => {
    try {
      if (err || !user) {
        next(boom.unauthorized());
      }
    } catch (err) {
      next(err);
    }

    // If password is succes , We are going to login the user
    req.login(user, { session: false }, async (error) => {
      if (error || !user) {
        next(error);
      }

      const apiKey = await apiKeysService.getApiKey({
        token: apiKeyToken
      });

      const { _id: id, username } = user;

      const resultSignIn = await authService.signToken({
        id,
        username,
        apiKey
      });

      response.success(req, res, '', resultSignIn, 200);
    });
  })(req, res, next);
});

// Sign-up
router.post(
  '/sign-up',
  validation(createUserSchema),
  async (req, res, next) => {
    const { body: user } = req;

    try {
      const existUser = await usersService.getUser(user);

      if (existUser._id) {
        next(boom.unauthorized('Username already exist'));
      }

      const createdUserId = await usersService.createUser({ user });

      response.success(req, res, 'User created', createdUserId, 200);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
