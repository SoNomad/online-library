const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");
const router = Router();

router.post("/admin/user", usersController.addUser);
router.delete("/admin/user/:id", usersController.deleteUser);
router.patch("/admin/user/:id", usersController.editUser);
router.get("/admin/user", usersController.getUsers);
router.patch("/admin/block/:user_id", usersController.banUser);
router.patch("/user/:user_id/book/:book_id", usersController.returnBook);
router.patch("/admin//user/:user_id/book/:book_id", usersController.bookBan);

module.exports = router;
