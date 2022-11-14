const joi = require('@hapi/joi');
const validations = require('../validations');

const userIdSchema = joi.string().regex(validations.mongoId);
const userUserNameSchema = joi.string().max(50).regex(validations.name);
const userPasswordSchema = joi
  .string()
  .min(8)
  .max(32)
  .regex(validations.password);

const createUserSchema = {
  username: userUserNameSchema.required(),
  password: userPasswordSchema.required()
};

const updateUserSchema = {
  username: userUserNameSchema.required(),
  password: userPasswordSchema.required()
};

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema
};
