import { dbPool } from "../dbconfig.js";

export default class ProductModel {
  static async getAllProducts() {
    try {
      const sql = "SELECT * FROM product";
      const [results] = await dbPool.query(sql);
      return results;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  static async newProduct({
    product_id,
    product_name,
    brand,
    ingredients,
    img,
    img_small,
    origin,
  }) {
    try {
      const sql =
        "INSERT INTO product (product_id, product_name, brand, ingredients, img, img_small, origin) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const [result] = await dbPool.query(sql, [
        product_id,
        product_name,
        brand,
        ingredients,
        img,
        img_small,
        origin,
      ]);
      return result;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async updateProduct(
    product_id,
    { product_name, brand, ingredients, img, img_small, origin }
  ) {
    try {
      const sql =
        "UPDATE product SET product_id = ?, product_name = ?, brand = ?, ingredients = ?, img = ?, img_small = ?, origin = ? WHERE product_id = ?";
      await dbPool.query(sql, [
        product_id,
        product_name,
        brand,
        ingredients,
        img,
        img_small,
        origin,
        product_id,
      ]);
      return { message: "Product updated successfully" };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async deleteProduct(product_id) {
    try {
      await dbPool.query("DELETE FROM product WHERE product_id = ?", [
        product_id,
      ]);
      return { message: "Product deleted successfully" };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
