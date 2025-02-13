import express from "express";
import User from "../models/auth-m.js";
import { prisma } from "../prisma/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authUser = express.Router();

authUser.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await User.registerUser(username, email, password);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error registering user" });
  }
});

authUser.post("/login", async (req, res) => {
  try {
    // console.log(req.body);
    // const { username, password } = req.body;
    const localPartRegex = /^[a-zA-Z0-9._%+-]+$/;
    if (!localPartRegex.test(req.body.email)) {
      return res
        .status(400)
        .json({ message: "Only enter before the @gmail.com" });
    }
    const email = req.body.email.toLowerCase() + "@gmail.com";
    const password = req.body.password;
    // console.log("email + password: ", email, password);
    // const result = await User.loginUser(email, password);
    const user = await prisma.user.findUnique({ where: { email } });
    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return res.status(401).json("Invalid credentials");
    }
    const token = jwt.sign(
      { id: user.userId, email: user.email },
      "jwt_secret",
      {
        expiresIn: "1h",
      }
    );
    const result = { other: user, token: token };
    console.log("Log in info: ", result.token, result.other);
    // if (result.status === "error") {
    //   return res.status(401).json({ error: "Invalid email or password" });
    // }
    res
      .cookie("access_cookie", result.token, { httpOnly: true })
      .status(200)
      .json({ status: 200, user: result.other, token: result.token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

export default authUser;
