const express = require("express");
const app = express();
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const todoRoutes = require("./routes/todo.routes");
const adminRoutes = require("./routes/admin.routes");

app.use(express.json());
app.use("/", authRoutes);
app.use("/", todoRoutes);
app.use("/", adminRoutes);

connectDB();

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log("Server Started"));
