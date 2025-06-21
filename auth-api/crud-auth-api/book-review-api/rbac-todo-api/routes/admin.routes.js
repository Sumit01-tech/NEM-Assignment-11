const express = require("express");
const auth = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/admin.middleware");
const { getAllTodos, deleteAnyTodo } = require("../controllers/todo.controller");

const router = express.Router();

router.get("/admin/todos", auth, isAdmin, getAllTodos);
router.delete("/admin/todos/:id", auth, isAdmin, deleteAnyTodo);

module.exports = router;
