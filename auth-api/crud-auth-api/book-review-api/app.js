const express = require("express");
const app = express();
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/book.routes");
const reviewRoutes = require("./routes/review.routes");

app.use(express.json());

app.use("/", authRoutes);
app.use("/", bookRoutes);
app.use("/", reviewRoutes);

connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server Started"));
