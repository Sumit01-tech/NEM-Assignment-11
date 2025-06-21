const express = require("express");
const auth = require("../middleware/auth.middleware");
const {
    createTodo,
    getMyTodos,
    updateTodo,
    deleteTodo
} = require("../controllers/todo.controller");

const router = express.Router();

router.post("/todos", auth, createTodo);
router.get("/todos", auth, getMyTodos);
router.put("/todos/:id", auth, updateTodo);
router.delete("/todos/:id", auth, deleteTodo);

module.exports = router;
