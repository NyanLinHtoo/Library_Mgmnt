const {
  getAllBooksService,
  addBookService,
  borrowBookService,
} = require("../services/bookService");

const getAllBooks = async (req, res) => {
  getAllBooksService(req, res);
};

const addBook = async (req, res) => {
  addBookService(req, res);
};

const borrowBook = async (req, res) => {
  borrowBookService(req, res);
};

module.exports = { getAllBooks, addBook, borrowBook };
