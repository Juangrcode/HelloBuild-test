const validations = {
  mongoId: /^[0-9a-fA-F]{24,24}$/,
  name: /^[A-Ña-ñ0-9]+([\w\s][\\-]?)+$/,
  password: /^[a-zA-Z0-9\S ]{8,32}$/
};

module.exports = validations;
