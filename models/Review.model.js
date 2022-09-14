const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  title: String,
  text: String,
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  book: { type: mongoose.SchemaTypes.ObjectId, ref: "Book" },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
