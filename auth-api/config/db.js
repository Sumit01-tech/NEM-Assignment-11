const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/authDB");
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("Mongo Connection Failed", err);
    }
};

module.exports = connectDB;
