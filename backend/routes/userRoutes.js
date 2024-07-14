const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  // getCurrentUser,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/", auth, getAllUsers);
// router.get("/me", auth, getCurrentUser);

module.exports = router;
