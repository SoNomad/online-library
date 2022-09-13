const { Router } = require("express");
const { genresController } = require("../controllers/genres.controller");
const router = Router();

router.post("/admin/genre", genresController.addGenre);
router.delete("/admin/genre/:id", genresController.deleteGenre);
router.patch("/admin/genre/:id", genresController.editGenre);
router.get("/admin/genre", genresController.getGenre);

module.exports = router;
