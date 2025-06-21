const Review = require("../models/review.model");

exports.addReview = async (req, res) => {
    const { rating, comment } = req.body;
    const bookId = req.params.id;
    try {
        const review = await Review.create({
            bookId,
            userId: req.user.userId,
            rating,
            comment
        });
        res.status(200).json(review);
    } catch {
        res.status(500).json({ error: "Failed to add review" });
    }
};

exports.editReview = async (req, res) => {
    const { rating, comment } = req.body;
    const reviewId = req.params.id;
    try {
        const review = await Review.findOneAndUpdate(
            { _id: reviewId, userId: req.user.userId },
            { rating, comment },
            { new: true }
        );
        if (!review) return res.status(403).json({ message: "Unauthorized or not found" });
        res.status(200).json(review);
    } catch {
        res.status(500).json({ error: "Failed to edit review" });
    }
};

exports.deleteReview = async (req, res) => {
    const reviewId = req.params.id;
    try {
        const review = await Review.findOneAndDelete({
            _id: reviewId,
            userId: req.user.userId
        });
        if (!review) return res.status(403).json({ message: "Unauthorized or not found" });
        res.status(200).json({ message: "Review deleted" });
    } catch {
        res.status(500).json({ error: "Failed to delete review" });
    }
};
