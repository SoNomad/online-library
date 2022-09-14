const Book = require("../models/Book.model");
const User = require("../models/User.model");

module.exports.usersController = {
  addUser: async (req, res) => {
    try {
      const { name, isBlocked, rentedBooks } = req.body;
      const user = await User.create({
        name,
        isBlocked,
        rentedBooks,
      });
      res.json(`Пользователь ${user.name} добавлен в коллекцию.`);
    } catch (e) {
      res.json("Возникла ошибка при добавлении юзера. Код ошибки:" + e);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndRemove(req.params.id);
      res.json("Юзер удален");
    } catch (e) {
      res.json("Возникла ошибка при удалении юзера. Код ошибки:/n" + e);
    }
  },
  getUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.json(user);
    } catch (e) {
      res.json(e);
    }
  },
  editUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      res.json(user);
    } catch (e) {
      res.json(e.message);
    }
  },
  banUser: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.user_id, {
        isBlocked: true,
        rentedBooks: [],
      });
      await Book.find({ isRentedBy: req.params.user_id }).updateOne({
        isRentedBy: null,
      });
      return res.json("User banned");
    } catch (e) {
      res.json(e.message);
    }
  },
  returnBook: async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id);
      const book = await Book.findById(req.params.book_id);

      if (!user.rentedBooks.includes()) {
        return res.json(`Книга ${book.name} не найдена в списке арендованных`);
      }

      await user.updateOne({
        $pull: { rentedBooks: req.params.book_id },
      });
      await book.updateOne({
        $pull: { isRentedBy: req.params.user_id },
      });
    } catch (e) {
      res.json(e);
    }
  },
  bookBan: async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id);
      const book = await Book.findById(req.params.book_id);

      if (!user.rentedBooks.includes) {
        return res.json(`Книга ${book.name} не найдена в списке арендованных`);
      }

      await user.updateMany({
        $pull: { rentedBooks: req.params.book_id },
        isBlocked: true,
      });
      await book.updateOne({
        $pull: { isRentedBy: req.params.user_id },
      });
    } catch (e) {
      res.json(e);
    }
  },
};
