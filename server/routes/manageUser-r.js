import express from "express";
import UserModel from "../models/manageUser-m.js";

const handleUser = express.Router();

handleUser.get("/users", async (req, res) => {
  try {
    const [users] = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

handleUser.post("/users", async (req, res) => {
  try {
    const newUser = req.body;
    const user = await UserModel.createUser(newUser);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

handleUser.delete("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    await UserModel.deleteUser(user_id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

handleUser.put("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const updatedUser = req.body;
    await UserModel.updateUser(user_id, updatedUser);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default handleUser;
