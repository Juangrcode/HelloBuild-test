// Express
const express = require('express');
const router = express.Router();

// Services
const passport = require('passport');
const usersService = require('../services/users');

// Responses
const boom = require('@hapi/boom');
const response = require('../utils/response');

// Schemas
const {
  userIdSchema,
  createUserSchema,
  updateUserSchema
} = require('../utils/schemas/users');

// Middlewares
// JWT Strategy middleware
require('../utils/auth/strategies/jwt');
const validation = require('../utils/middlewares/validationHandler');
const scopesValidationHandler = require('../utils/middlewares/scopesValidationHandler');

/*
   ---------------------- Users Routes ----------------------
*/

// Get user by id
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:users']),
  async (req, res, next) => {
    const { userId } = req.params;

    try {
      const [user] = await usersService.getUsers({ _id: userId });

      response.success(req, res, 'User retrieved', user, 200);
    } catch (err) {
      next(err);
    }
  }
);

// Create User
router.post('/', validation(createUserSchema), async (req, res, next) => {
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
});

// Update user by ID
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['update:users']),
  validation({ userId: userIdSchema }, 'params'),
  validation(updateUserSchema),
  async (req, res, next) => {
    const { userId } = req.params;
    const { body: user } = req;

    try {
      const updatedUserId = await usersService.updateUser({ userId, user });

      response.success(req, res, 'User updated', updatedUserId, 200);
    } catch (err) {
      next(err);
    }
  }
);

// Delete user by ID

router.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['delete:users']),
  validation({ userId: userIdSchema }, 'params'),
  async (req, res, next) => {
    const { userId } = req.params;

    try {
      const deletedUser = await usersService.deleteUser({ userId });

      response.success(req, res, 'User deleted', deletedUser, 200);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
