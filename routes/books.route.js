const { Router } = require("express");
const { booksController } = require("../controllers/books.controller");
const router = Router();

router.post("/admin/books", booksController.addBook);
router.patch("/admin/books/:id", booksController.editBook);
router.delete("/admin/books/:id", booksController.deleteBook);
router.get("/books", booksController.getBooks);
router.get("/books/:id", booksController.getBookById);
router.get("/books/genre/:id", booksController.getBookByGenre);
router.patch("/books/:id/user/:userId", booksController.toRent);

module.exports = router;
