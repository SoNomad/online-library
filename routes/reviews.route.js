const { Router } = require("express");
const { reviewsController } = require("../controllers/reviews.controller");
const router = Router();

router.post("/book/review", reviewsController.addReview);
router.delete("/review/:id", reviewsController.deleteReview);
router.patch("/review/:id", reviewsController.editReview);
router.get("/review", reviewsController.getReviews);
router.get("/book/:id/review", reviewsController.getBookReviews);

module.exports = router;
