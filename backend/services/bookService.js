const Book = require("../models/Book");
const User = require("../models/User");

const addBookService = async (req, res) => {
  try {
    const { title, category } = req.body;
    const newBook = new Book({ title, category });
    await newBook.save();
    res.json(newBook);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const getAllBooksService = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const borrowBookService = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.borrowedBooks.length >= 5) {
      return res
        .status(400)
        .json({ message: "Cannot borrow more than 5 books" });
    }

    const book = await Book.findById(req.params.id);
    console.log(book);
    if (!book || book.isBorrowed) {
      console.log("I am herer");
      return res.status(400).json({ message: "Book not isBorrowed" });
    }

    book.isBorrowed = true;
    book.borrowedBy = user._id;
    await book.save();

    user.borrowedBooks.push(book._id);
    await user.save();

    res.json({ message: "Book borrowed successfully" });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = { getAllBooksService, addBookService, borrowBookService };
