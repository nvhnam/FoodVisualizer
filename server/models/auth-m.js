import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbPool } from "../dbconfig.js";
import { config as dotenvConfig } from "dotenv";
import moment from "moment-timezone";

// Configure dotenv
dotenvConfig();

const saltRounds = 10;
const secretKey = process.env.secretKey;

export default class User {
  constructor(username, email, password, age, gender) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.age = age;
    this.gender = gender;
  }

  static async registerUser(username, email, password, age, gender) {
    try {
      const checkExist = `SELECT * FROM user WHERE username = ? OR email = ?`;
      const [results] = await dbPool.query(checkExist, [username, email]);
      const existingUser = results[0];

      if (existingUser) {
        throw new Error("Username or email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const sql = `INSERT INTO user (username, email, password, age) VALUES (?, ?, ?, ?)`;
      const [newUser] = await dbPool.query(sql, [
        username,
        email,
        hashedPassword,
        age,
      ]);

      return { user: newUser };
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  static async loginUser(username, password) {
    try {
      const query = `SELECT * FROM user WHERE username = ?`;
      const [results] = await dbPool.query(query, [username]);
      const user = results[0];
      if (!user) {
        return { status: "error", message: "User not found" };
      }

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return { status: "error", message: "Incorrect password" };
      }

      // Tạo JWT token khi đăng nhập thành công
      const token = this.generateToken(user.user_id);

      // Cập nhật token trong cơ sở dữ liệu
      const updateQuery = `UPDATE user SET token = ? WHERE user_id = ?`;
      await dbPool.query(updateQuery, [token, user.user_id]);

      // Lấy giờ token bắt đầu và kết thúc
      const vietnamTime = moment().tz("Asia/Ho_Chi_Minh");
      const tokenStart = vietnamTime.format("YYYY-MM-DD HH:mm:ss");
      const tokenExpiration = vietnamTime
        .add(1, "hour")
        .format("YYYY-MM-DD HH:mm:ss");

      console.log(`Token issued at: ${tokenStart}`);
      console.log(`Token expires at: ${tokenExpiration}`);

      return { status: "success", user, token };
    } catch (error) {
      console.error("Error logging in user:", error);
      return { status: "error", message: "Internal server error" };
    }
  }

  static async getUserByUsername(username) {
    try {
      const query = `SELECT * FROM user WHERE username = ?`;
      const [results] = await dbPool.query(query, [username]);
      return results[0];
    } catch (error) {
      console.error("Error fetching user by username:", error);
      throw error;
    }
  }

  static generateToken(userId) {
    // giờ UTC => giờ Việt Nam
    const vietnamTime = moment().tz("Asia/Ho_Chi_Minh");
    const tokenExpiration = vietnamTime.add(1, "hour").unix(); // Tính theo giây

    return jwt.sign({ userId }, secretKey, {
      expiresIn: tokenExpiration,
    });
  }
}
