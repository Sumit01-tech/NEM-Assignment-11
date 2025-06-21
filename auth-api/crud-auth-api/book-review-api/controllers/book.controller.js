const Book = require("../models/book.model");
const Review = require("../models/review.model");

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.getBookWithReviews = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        const reviews = await Review.find({ bookId: id }).populate("userId", "name");
        res.status(200).json({ book, reviews });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};
