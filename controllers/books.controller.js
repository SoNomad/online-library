const Book = require("../models/Book.model");
const User = require("../models/User.model");

module.exports.booksController = {
  addBook: async (req, res) => {
    const { name, genre, isRentedBy } = req.body;
    try {
      const book = await Book.create({
        name,
        genre,
        isRentedBy,
      });
      res.json(book);
    } catch (e) {
      res.json(e);
    }
  },

  getBooks: async (req, res) => {
    try {
      const book = await Book.find();
      res.json(book);
    } catch (e) {
      res.json(e);
    }
  },
  getBookById: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      res.json(book);
    } catch (e) {
      res.json(e);
    }
  },
  getBookByGenre: async (req, res) => {
    try {
      const book = await Book.find({ genre: req.params.id });
      res.json(book);
    } catch (e) {
      res.json(e);
    }
  },

  editBook: async (req, res) => {
    try {
      await Book.findByIdAndUpdate(req.params.id, req.body);
      res.json("Изменения сохранены");
    } catch (e) {
      res.json("Возникла ошибка при редактировании книги. Код ошибки:/n" + e);
    }
  },

  deleteBook: async (req, res) => {
    try {
      await Book.findByIdAndRemove(req.params.id);
      res.json("книга удален");
    } catch (e) {
      res.json("Возникла ошибка при удалении книги. Код ошибки:/n" + e.message);
    }
  },

  toRent: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      const user = await User.findById(req.params.userId);
      if (user.isBlocked) {
        return res.json("Пользователь заблокирован");
      }
      if (user.rentedBooks.length >= 3) {
        return res.json("Список арендованных книг полон");
      }
      if (!book.isRentedBy) {
        await book.updateOne({
          isRentedBy: req.params.userId,
        });
        await user.updateOne({
          $push: { rentedBooks: req.params.id },
        });

        return res.json("Юзер арендовал книгу");
      } else {
        return res.json("Книга уже в аренде");
      }
    } catch (e) {
      res.json(e);
    }
  },
};
