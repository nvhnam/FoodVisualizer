import mysql from "mysql2/promise";
import { dbPool } from "../dbconfig.js";

// sql.on("error", (err) => {
//   throw err;
// });
// MODEL: dùng để tạo truy vấn
export default class Product {
  constructor(product_id) {
    this.product_id = product_id;
  }

  static async getProductDetail(id) {
    try {
      const query = `SELECT * 
                     FROM product WHERE product_id = ?`;

      const [results] = await dbPool.query(query, [id]);
      if (results.length > 0) {
        return results[0]; // trả về 1 item duy nhất theo id
      } else {
        throw new Error("Product item not found");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  static async getProduct() {
    try {
      const query = `SELECT product_id, product_name, img FROM product`;
      const [results] = await dbPool.query(query);

      return results;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  static async getProductNutrients(id) {
    try {
      const query = `SELECT * FROM nutrient WHERE product_id = ${id}`;
      const [results] = await dbPool.query(query);

      return results[0];
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async getCategory() {
    try {
      const query = `SELECT * FROM category`;
      const [results] = await dbPool.query(query);

      return results;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async getProductByIdOrCategory(id, level0) {
    try {
      let query = `SELECT * FROM category WHERE 1=1`;
      const params = [];

      if (id) {
        query += ` AND product_id = ?`;
        params.push(id);
      } else if (level0) {
        query += ` AND level_0 = ?`;
        params.push(level0);
      }

      console.log("Query:", query);
      console.log("Params:", params);

      const [results] = await dbPool.query(query, params);
      return results;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
