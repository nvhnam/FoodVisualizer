import express from "express";
const getCart = express.Router();

import Cart from "../models/getCart-m.js";

getCart.get("/cart/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log("Cart userID: ", userId);
    const cart = await Cart.getUserCart(userId);
    res.json({ status: cart.status, cartItem: cart.cartItems });
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
});

getCart.post("/cart/add", async (req, res) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;

    // console.log("Backend: ", req);
    const cart = await Cart.postUserCart(userId, productId);
    console.log("Added cart in backend: ", cart.status, cart.message);
    res.json(cart);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
});

getCart.delete("/cart/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    await Cart.removeProductFromCart(userId, productId);
    res.status(200).send("Product removed successfully");
  } catch (error) {
    console.error("Error removing product from cart", error);
    res.status(500).send("Internal Server Error");
  }
});

export default getCart;
