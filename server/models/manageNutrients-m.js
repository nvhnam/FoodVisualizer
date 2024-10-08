import { dbPool } from "../dbconfig.js";

export default class NutrientsModel {
  static async getAllNutrients() {
    try {
      const sql = "SELECT * FROM nutrients";
      const [results] = await dbPool.query(sql);
      return results;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  static async newNutrients({
    product_id,
    pack_size,
    serving_size,
    energy,
    calories,
    fat,
    saturates,
    sugars,
    salt,
  }) {
    try {
      const sql =
        "INSERT INTO nutrients (product_id, pack_size, serving_size, energy, calories, fat, saturates, sugars, salt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      await dbPool.query(sql, [
        product_id,
        pack_size,
        serving_size,
        energy,
        calories,
        fat,
        saturates,
        sugars,
        salt,
      ]);
      return { message: "Nutrients added successfully" };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async getNutrientsByProductId(product_id) {
    try {
      const [results] = await dbPool.query(
        "SELECT * FROM nutrients WHERE product_id = ?",
        [product_id]
      );
      return results;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async updateNutrients(
    product_id,
    { pack_size, serving_size, energy, calories, fat, saturates, sugars, salt }
  ) {
    try {
      const sql =
        "UPDATE nutrients SET pack_size = ?, serving_size = ?, energy = ?, calories = ?, fat = ?, saturates = ?, sugars = ?, salt = ? WHERE product_id = ?";
      await dbPool.query(sql, [
        pack_size,
        serving_size,
        energy,
        calories,
        fat,
        saturates,
        sugars,
        salt,
        product_id,
      ]);
      return { message: "Nutrients updated successfully" };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async deleteNutrients(product_id) {
    try {
      await dbPool.query("DELETE FROM nutrients WHERE product_id = ?", [
        product_id,
      ]);
      return { message: "Nutrients deleted successfully" };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
