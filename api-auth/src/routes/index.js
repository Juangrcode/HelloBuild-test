const auth = require('./auth');
const users = require('./users');
const repositories = require('./repositories');

const routes = (server) => {
  server.use('/api/auth', auth);
  server.use('/api/users', users);
  server.use('/api/repositories', repositories);
};

module.exports = routes;
