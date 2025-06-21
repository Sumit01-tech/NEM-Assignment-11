const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/notesDB");
        console.log("MongoDB connected");
    } catch (err) {
        console.error("DB Connection failed:", err);
    }
};

module.exports = connectDB;
