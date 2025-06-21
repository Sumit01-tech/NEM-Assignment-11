const express = require("express");
const router = express.Router();
const { createNote, getMyNotes, updateNote, deleteNote } = require("../controllers/note.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/notes", authMiddleware, createNote);
router.get("/notes", authMiddleware, getMyNotes);
router.put("/notes/:id", authMiddleware, updateNote);
router.delete("/notes/:id", authMiddleware, deleteNote);

module.exports = router;
