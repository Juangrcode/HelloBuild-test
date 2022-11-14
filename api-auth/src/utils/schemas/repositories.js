const joi = require('@hapi/joi');
const validations = require('../validations');

const repositoryIdSchema = joi.string().regex(validations.mongoId);
const repositoryNameSchema = joi
  .string()
  .min(2)
  .max(50)
  .regex(validations.name);
const repositoryIsFavoriteSchema = joi.boolean().default(false);

const createRepositorySchema = {
  name: repositoryNameSchema.required(),
  isFavorite: repositoryIsFavoriteSchema,
  user: repositoryIdSchema.required()
};

const updateRepositorySchema = {
  name: repositoryNameSchema,
  isFavorite: repositoryIsFavoriteSchema
};

module.exports = {
  repositoryIdSchema,
  createRepositorySchema,
  updateRepositorySchema
};
