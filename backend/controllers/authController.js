const { registerService, loginService } = require("../services/authService");

const authController = {
  login: loginService,
  register: registerService,
};

module.exports = { authController };
