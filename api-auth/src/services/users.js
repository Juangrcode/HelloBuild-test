const UsersModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const config = require('../config');

const getUsers = async (query) => {
  const users = await UsersModel.find(query);

  const filterUsers = users.map((user) => ({ ...user._doc, password: null }));

  return filterUsers || [];
};

const getUser = async ({ username }) => {
  const user = await UsersModel.findOne({
    username
  }).exec();

  return user || {};
};

const createUser = async ({ user }) => {
  const { username, password } = user;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(
    password || config.defaultUserPassword,
    saltRounds
  );

  const createUser = await new UsersModel({
    username: username ? username.toLowerCase() : '',
    password: hashedPassword
  });
  await createUser.save();

  return createUser._id;
};

const updateUser = async ({ userId, user }) => {
  if (user.password) user.password = await bcrypt.hash(user.password, 10);

  await UsersModel.updateOne(
    {
      _id: userId
    },
    { $set: user },
    { upsert: false }
  );
  return userId;
};

const deleteUser = async ({ userId }) => {
  await UsersModel.deleteOne({ _id: userId });

  return userId;
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
