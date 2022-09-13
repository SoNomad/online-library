const Review = require("../models/Review.model");

module.exports.reviewsController = {
  addReview: async (req, res) => {
    try {
      const { title, text, user } = req.body;
      const review = await Review.create({
        title,
        text,
        user,
        book,
      });
      res.json(review);
    } catch (e) {
      res.json(e);
    }
  },
  editReview: async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      res.json(review);
    } catch (e) {
      res.json(e);
    }
  },
  deleteReview: async (req, res) => {
    try {
      await Review.findByIdAndRemove(req.params.id);
      res.json("Review has been deleted");
    } catch (e) {
      res.json("Возникла ошибка при удалении review. Код ошибки:/n" + e);
    }
  },
  getReviews: async (req, res) => {
    try {
      const review = await Review.findById(req.params.id).populate(
        "user book",
        "name"
      );
      res.json(review);
    } catch (e) {
      res.json(e);
    }
  },
  getBookReviews: async (req, res) => {
    try {
      const review = await Review.find({ book: req.params.id }).populate(
        "user book",
        "name"
      );
      res.json(review);
    } catch (e) {
      res.json(e);
    }
  },
};
