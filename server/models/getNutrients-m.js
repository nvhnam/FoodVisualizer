import mysql from "mysql2/promise";
import { dbPool } from "../dbconfig.js";

export default class Nutrients {
  static async getAllNutrients() {
    try {
      const sql = "SELECT * FROM nutrient";
      const [results] = await dbPool.query(sql);
      return results;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
