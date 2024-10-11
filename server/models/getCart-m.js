import mysql from "mysql2/promise";
import { dbPool } from "../dbconfig.js";

export default class Cart {
  static async getUserCart(userId) {
    try {
      const query = `SELECT product.*, cart.quantity 
        FROM cart 
        JOIN product ON cart.product_id = product.product_id 
        WHERE cart.user_id = ?`;
      const [cartItems] = await dbPool.query(query, [userId]);

      if (!cartItems.length) {
        return { status: "error", message: "Cart is empty" };
      }

      //   console.log(cartItems);

      return { status: "success", cartItems: cartItems };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async postUserCart(userId, productId) {
    // const theUserId = userId;
    // const theProductId = productId;
    // console.log("Backend: ", theUserId, theProductId);
    if (!userId || !productId) {
      return {
        status: "error",
        message: "User ID and Product ID are required",
      };
    }
    try {
      const checkQuery = `SELECT * FROM cart WHERE user_id = ? AND product_id = ?`;
      const [existingCartItem] = await dbPool.query(checkQuery, [
        userId,
        productId,
      ]);

      if (existingCartItem.length > 0) {
        const updateQuery = `UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?`;
        await dbPool.query(updateQuery, [userId, productId]);
      } else {
        const insertQuery = `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)`;
        await dbPool.query(insertQuery, [userId, productId]);
      }
      return {
        status: "success",
        message: "Product added to cart successfully",
      };
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return { error: "Internal server error" };
    }
  }
}
