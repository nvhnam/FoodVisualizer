import { dbPool } from "../dbconfig.js";

export default class CategoryModel {
  static async newCategory({ product_id, level_0 }) {
    try {
      const sql = "INSERT INTO category (product_id, level_0) VALUES (?, ?)";
      await dbPool.query(sql, [product_id, level_0]);
      return { message: "Category added successfully" };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async getAllCategory() {
    try {
      const sql = "SELECT * FROM category";
      const [results] = await dbPool.query(sql);
      return results;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async getCategoryByProductId(product_id) {
    try {
      const [results] = await dbPool.query(
        "SELECT * FROM category WHERE product_id = ?",
        [product_id]
      );
      return results;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async updateCategory(product_id, { level_0 }) {
    try {
      const sql = "UPDATE category SET level_0 = ? WHERE product_id = ?";
      await dbPool.query(sql, [level_0, product_id]);
      return { message: "Category updated successfully" };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async deleteCategory(product_id) {
    try {
      await dbPool.query("DELETE FROM category WHERE product_id = ?", [
        product_id,
      ]);
      return { message: "Category deleted successfully" };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
