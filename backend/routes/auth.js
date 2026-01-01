
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({ name, email, password });
        await user.save();

        res.json({ message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({ message: "Login successful", user });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
