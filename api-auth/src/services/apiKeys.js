const ApiKeysModel = require('../models/apiKey.model');

// Get permisss of token public
const getApiKey = async ({ token }) => {
  const [apiKey] = await ApiKeysModel.find({ token });
  return apiKey;
};

module.exports = {
  getApiKey
};
