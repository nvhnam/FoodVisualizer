import jwt from "jsonwebtoken";
import { config as dotenvConfig } from "dotenv";
import { dbPool } from "../dbconfig.js";
import moment from "moment-timezone";

// Configure dotenv
dotenvConfig();
const secretKey = process.env.secretKey;

export default class Record {
  static async createRecord(token, typeOfChart, date) {
    try {
      const decoded = jwt.verify(token, secretKey);
      const user_id = decoded.userId; // Lấy userId từ payload của token

      const sql = `
        INSERT INTO record (user_id, typeOfChart, date)
        VALUES (?, ?, ?)
      `;
      //   const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

      const [result] = await dbPool.query(sql, [user_id, typeOfChart, date]);

      return result.insertId; // Trả về ID của bản ghi mới được thêm vào
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
