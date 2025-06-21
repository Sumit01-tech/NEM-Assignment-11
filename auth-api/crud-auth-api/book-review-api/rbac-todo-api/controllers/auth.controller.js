const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already registered" });

        const hashed = await bcrypt.hash(password, 8);
        const user = await User.create({ name, email, password: hashed, role });
        res.status(201).json({ message: "Signup successful", userId: user._id });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id, role: user.role }, "masai_secret", { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};
