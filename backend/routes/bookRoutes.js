const express = require("express");
const router = express.Router();
const {
  addBook,
  getAllBooks,
  borrowBook,
} = require("../controllers/bookController");
const auth = require("../middleware/auth");

router.post("/", auth, addBook);
router.get("/", getAllBooks);
router.post("/borrow/:id", auth, borrowBook);

module.exports = router;
