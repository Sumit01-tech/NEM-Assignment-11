const express = require("express");
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const noteRoutes = require("./routes/note.routes");

app.use(express.json());

app.use("/", authRoutes);
app.use("/", noteRoutes);

connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server Started"));
