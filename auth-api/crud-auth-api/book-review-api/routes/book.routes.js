const express = require("express");
const router = express.Router();
const { getAllBooks, getBookWithReviews } = require("../controllers/book.controller");

router.get("/books", getAllBooks);
router.get("/books/:id", getBookWithReviews);

module.exports = router;
