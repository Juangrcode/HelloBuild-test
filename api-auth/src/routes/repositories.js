// Express
const express = require('express');
const router = express.Router();

// Services
const repositoriesService = require('../services/repositories');

// Responses
const response = require('../utils/response');

// Schemas
const {
  repositoryIdSchema,
  createRepositorySchema,
  updateRepositorySchema
} = require('../utils/schemas/repositories');

// Middlewares
// JWT Strategy middleware
require('../utils/auth/strategies/jwt');
const validation = require('../utils/middlewares/validationHandler');

/*
   ---------------------- Repositories Routes ----------------------
*/

// Get repositories by user
router.get(
  '/:repositoryId',
  validation({ repositoryId: repositoryIdSchema }, 'params'),
  // passport.authenticate('jwt', { session: false }),
  // scopesValidationHandler(['read:repositories']),
  async (req, res, next) => {
    const { repositoryId } = req.params;

    try {
      const repositories = await repositoriesService.getRepositoriesByUser({
        repositoryId
      });

      response.success(req, res, 'Repositories retrieved', repositories, 200);
    } catch (err) {
      next(err);
    }
  }
);

// Create Reposiitry by User
router.post(
  '/',
  validation(createRepositorySchema),
  // passport.authenticate('jwt', { session: false }),
  // scopesValidationHandler(['create:repositories']),
  async (req, res, next) => {
    const { body: repository } = req;

    try {
      const createdRepositoryId = await repositoriesService.createRepository(
        repository
      );

      response.success(
        req,
        res,
        'Repository created',
        createdRepositoryId,
        200
      );
    } catch (err) {
      next(err);
    }
  }
);

// Put Repository
router.put(
  '/:repositoryId',
  validation({ repositoryId: repositoryIdSchema }, 'params'),
  validation(updateRepositorySchema),
  // passport.authenticate('jwt', { session: false }),
  // scopesValidationHandler(['update:repositories']),
  async (req, res, next) => {
    const { repositoryId } = req.params;
    const { body: repository } = req;

    try {
      const updatedRepositoryId = await repositoriesService.updateRepository({
        repositoryId,
        repository
      });

      response.success(
        req,
        res,
        'Repository updated',
        updatedRepositoryId,
        200
      );
    } catch (err) {
      next(err);
    }
  }
);

// Delete Repository
router.delete(
  '/:repositoryId',
  validation({ repositoryId: repositoryIdSchema }, 'params'),
  // passport.authenticate('jwt', { session: false }),
  // scopesValidationHandler(['delete:repositories']),
  async (req, res, next) => {
    const { repositoryId } = req.params;

    try {
      const deletedRepositoryId = await repositoriesService.deleteRepository({
        repositoryId
      });

      response.success(
        req,
        res,
        'Repository deleted',
        deletedRepositoryId,
        200
      );
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
