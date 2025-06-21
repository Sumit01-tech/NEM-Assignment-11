const Todo = require("../models/todo.model");

exports.createTodo = async (req, res) => {
    try {
        const todo = await Todo.create({ ...req.body, createdBy: req.user.userId });
        res.status(201).json(todo);
    } catch {
        res.status(500).json({ error: "Failed to create todo" });
    }
};

exports.getMyTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ createdBy: req.user.userId });
        res.status(200).json(todos);
    } catch {
        res.status(500).json({ error: "Failed to fetch todos" });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const updated = await Todo.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user.userId },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(403).json({ message: "Unauthorized or todo not found" });
        res.status(200).json(updated);
    } catch {
        res.status(500).json({ error: "Failed to update todo" });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const deleted = await Todo.findOneAndDelete({ _id: req.params.id, createdBy: req.user.userId });
        if (!deleted) return res.status(403).json({ message: "Unauthorized or todo not found" });
        res.status(200).json({ message: "Todo deleted" });
    } catch {
        res.status(500).json({ error: "Failed to delete todo" });
    }
};

exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find().populate("createdBy", "name email");
        res.status(200).json(todos);
    } catch {
        res.status(500).json({ error: "Failed to fetch all todos" });
    }
};

exports.deleteAnyTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ message: "Todo not found" });
        res.status(200).json({ message: "Todo deleted by Admin" });
    } catch {
        res.status(500).json({ error: "Failed to delete todo" });
    }
};
