const express = require("express");
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/authMiddleware");

app.use(express.json());
app.use("/", authRoutes);

app.get("/protected", authMiddleware, (req, res) => {
    res.status(200).json({ message: `Welcome ${req.user.name}! You are authorized.` });
});

connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server Started"));
