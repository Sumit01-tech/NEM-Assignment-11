const express = require("express");
const router = express.Router();
const { addReview, editReview, deleteReview } = require("../controllers/review.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/books/:id/reviews", authMiddleware, addReview);
router.put("/reviews/:id", authMiddleware, editReview);
router.delete("/reviews/:id", authMiddleware, deleteReview);

module.exports = router;
