const Note = require("../models/note.model");

exports.createNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = await Note.create({
            title,
            content,
            createdBy: req.user.userId
        });
        res.status(200).json(note);
    } catch {
        res.status(500).json({ error: "Failed to create note" });
    }
};

exports.getMyNotes = async (req, res) => {
    try {
        const notes = await Note.find({ createdBy: req.user.userId });
        if (notes.length === 0) return res.status(404).json({ message: "No notes found" });
        res.status(200).json(notes);
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const note = await Note.findOneAndUpdate(
            { _id: id, createdBy: req.user.userId },
            { title, content },
            { new: true }
        );
        if (!note) return res.status(404).json({ message: "Note not found or unauthorized" });
        res.status(200).json(note);
    } catch {
        res.status(500).json({ error: "Failed to update note" });
    }
};

exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findOneAndDelete({ _id: id, createdBy: req.user.userId });
        if (!note) return res.status(404).json({ message: "Note not found or unauthorized" });
        res.status(200).json({ message: "Note deleted" });
    } catch {
        res.status(500).json({ error: "Failed to delete note" });
    }
};
