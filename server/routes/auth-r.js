import express from "express";
import User from "../models/auth-m.js";
import { dbPool } from "../dbconfig.js";

const authUser = express.Router();

const CLIENT_PORT = process.env.CLIENT_PORT;
const CLIENT_URL = process.env.CLIENT_URL || `http://localhost:${CLIENT_PORT}`;

authUser.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const results = await User.registerUser(username, email, password);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error registering user" });
  }
});

authUser.get("/verify/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const [user] = await dbPool.query(
      "SELECT email FROM user WHERE verification_token = ?",
      [token]
    );

    if (user.length === 0) {
      return res.redirect(
        `${
          CLIENT_URL || `http://localhost:${CLIENT_PORT}`
        }/signup?error=invalid_token`
      );
    }

    const email = user[0].email;

    await dbPool.query(
      "UPDATE user SET is_verified = 1, verification_token = NULL WHERE email = ?",
      [email]
    );

    res
      // .status(200)
      // .json({ message: "Email verified successfully! You can now log in." })
      .redirect(
        `${
          CLIENT_URL || `http://localhost:${CLIENT_PORT}`
        }/login?success=valid_token`
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error verify user registration" });
  }
});

authUser.post("/login", async (req, res) => {
  try {
    // console.log(req.body);
    // const { username, password } = req.body;

    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    // console.log("email + password: ", email, password);
    const result = await User.loginUser(email, password);

    // console.log("Log in info: ", result.token, result.other);
    if (result.status === "error") {
      return res.status(401).json({ error: result.message });
    }

    if (result.status === 302) {
      return res.status(302).json({ error: result.message });
    }

    if (result.status === 403) {
      return res.status(403).json({ error: result.message });
    }

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
