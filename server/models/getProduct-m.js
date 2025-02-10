import mysql from "mysql2/promise";
import { dbPool } from "../dbconfig.js";

// sql.on("error", (err) => {
//   throw err;
// });
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
        return results[0];
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
      const query = `SELECT DISTINCT level_0 FROM category`;
      const [results] = await dbPool.query(query);

      return results;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async getFilteredProductNutrients(
    fat,
    saturates,
    sugars,
    salt,
    category
  ) {
    let query = `SELECT product.product_id, product_name, img 
      FROM product 
      JOIN nutrient ON product.product_id = nutrient.product_id
      JOIN category ON product.product_id = category.product_id
      WHERE 1=1`;

    const params = [];

    if (fat && fat !== "all") {
      if (fat === "low") {
        query += " AND fat < ?";
        params.push(3);
      } else if (fat === "medium") {
        query += " AND fat BETWEEN ? AND ?";
        params.push(3, 17.5);
      } else {
        query += " AND fat >= ?";
        params.push(17.5);
      }
    }

    if (saturates && saturates !== "all") {
      if (saturates === "low") {
        query += " AND saturates < ?";
        params.push(1.5);
      } else if (saturates === "medium") {
        query += " AND saturates BETWEEN ? AND ?";
        params.push(1.5, 5);
      } else {
        query += " AND saturates >= ?";
        params.push(5);
      }
    }

    if (sugars && sugars !== "all") {
      if (sugars === "low") {
        query += " AND sugars < ?";
        params.push(5);
      } else if (sugars === "medium") {
        query += " AND sugars BETWEEN ? AND ?";
        params.push(5, 22.5);
      } else {
        query += " AND sugars >= ?";
        params.push(22.5);
      }
    }

    if (salt && salt !== "all") {
      if (salt === "low") {
        query += " AND salt < ?";
        params.push(0.3);
      } else if (salt === "medium") {
        query += " AND salt BETWEEN ? AND ?";
        params.push(0.3, 1.5);
      } else {
        query += " AND salt >= ?";
        params.push(1.5);
      }
    }

    if (category !== "All" && category !== "Category") {
      query += ` AND category.level_0 = ?`;
      params.push(category);
    }
    try {
      const [results] = await dbPool.query(query, params);
      // console.log(results);
      return results;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
