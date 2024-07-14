const {
  getAllUsersService,
  createUserService,
  // getCurrentUserService,
} = require("../services/userService");

const getAllUsers = async (req, res) => {
  getAllUsersService(req, res);
};

const createUser = async (req, res) => {
  createUserService(req, res);
};

// const getCurrentUser = async (req, res) => {
//   getCurrentUserService(req, res);
// };

module.exports = { getAllUsers, createUser };
