import { dbPool } from "../dbconfig.js";

export default class RecordModel {
  static async getAllRecords() {
    try {
      const sql = "SELECT * FROM record";
      const [rows] = await dbPool.query(sql);
      return rows;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async getRecordById(record_id) {
    try {
      const sql = "SELECT * FROM record WHERE record_id = ?";
      const [rows] = await dbPool.query(sql, [record_id]);
      return rows;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async newRecord({ user_id, typeOfChart, date }) {
    try {
      const sql =
        "INSERT INTO record (user_id, typeOfChart, date) VALUES (?, ?, ?)";
      const [result] = await dbPool.query(sql, [user_id, typeOfChart, date]);
      return result.insertId;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async updateRecord(record_id, { user_id, typeOfChart, date }) {
    try {
      const sql =
        "UPDATE record SET user_id = ?, typeOfChart = ?, date = ? WHERE record_id = ?";
      await dbPool.query(sql, [user_id, typeOfChart, date, record_id]);
      return { message: "Record updated successfully" };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async deleteRecord(record_id) {
    try {
      const sql = "DELETE FROM record WHERE record_id = ?";
      await dbPool.query(sql, [record_id]);
      return { message: "Record deleted successfully" };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
