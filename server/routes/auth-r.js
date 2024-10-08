import express from "express";
import User from "../models/auth-m.js";

const authUser = express.Router();

authUser.post("/register", async (req, res) => {
  try {
    const { username, email, password, age } = req.body;
    await User.registerUser(username, email, password, age);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error registering user" });
  }
});

authUser.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await User.loginUser(username, password);
    console.log("Log in info", result);
    if (!result) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

export default authUser;
