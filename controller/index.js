const getUsers = require('./getUsers');
const register = require('./register');
const updateUser = require('./update');
const deleteUser = require('./deluser');
const login = require('./login');

module.exports = {
  getUsers,
  register,
  updateUser,
  deleteUser,
  login
};