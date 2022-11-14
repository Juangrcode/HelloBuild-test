const RepositoryModel = require('../models/repository.model');

const getRepositoriesByUser = async ({ repositoryId }) => {
  const repositories = await RepositoryModel.find({
    user: repositoryId
  }).exec();

  return repositories;
};

const createRepository = async (repository) => {
  const repositoryModel = await new RepositoryModel(repository);
  const createdRepository = await repositoryModel.save();

  return createdRepository._id;
};

const updateRepository = async ({ repositoryId, repository }) => {
  await RepositoryModel.updateOne(
    { _id: repositoryId },
    { $set: repository },
    { upsert: true }
  );

  return repositoryId;
};

const deleteRepository = async ({ repositoryId }) => {
  await RepositoryModel.deleteOne({
    _id: repositoryId
  });

  return repositoryId;
};

module.exports = {
  getRepositoriesByUser,
  createRepository,
  updateRepository,
  deleteRepository
};
