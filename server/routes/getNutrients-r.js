import express from "express";
const getNutrients = express.Router();
import { dbPool } from "../dbconfig.js";

import Nutrients from "../models/getNutrients-m.js";

getNutrients.get("/nutrients", async (req, res) => {
  try {
    const nutrients = await Nutrients.getAllNutrients();
    res.json(nutrients);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
});

getNutrients.get("/nutrients/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await dbPool.query(
      `
      SELECT product.*, cart.quantity, 
             nutrient.energy, nutrient.calories, nutrient.fat, nutrient.saturates, nutrient.sugars, nutrient.salt
      FROM cart
      JOIN product ON cart.product_id = product.product_id
      JOIN nutrient ON product.product_id = nutrient.product_id
      WHERE cart.user_id = ?
    `,
      [userId]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "Cart is empty." });
    }
    const totalNutrition = {
      energy: 0,
      calories: 0,
      fat: 0,
      saturates: 0,
      sugars: 0,
      salt: 0,
    };
    rows.forEach((item) => {
      totalNutrition.energy += item.energy * item.quantity;
      totalNutrition.calories += item.calories * item.quantity;
      totalNutrition.fat += item.fat * item.quantity;
      totalNutrition.saturates += item.saturates * item.quantity;
      totalNutrition.sugars += item.sugars * item.quantity;
      totalNutrition.salt += item.salt * item.quantity;
    });

    totalNutrition.energy = parseFloat(totalNutrition.energy.toFixed(1));
    totalNutrition.calories = parseFloat(totalNutrition.calories.toFixed(1));
    totalNutrition.fat = parseFloat(totalNutrition.fat.toFixed(1));
    totalNutrition.saturates = parseFloat(totalNutrition.saturates.toFixed(1));
    totalNutrition.sugars = parseFloat(totalNutrition.sugars.toFixed(1));
    totalNutrition.salt = parseFloat(totalNutrition.salt.toFixed(1));

    // console.log(totalNutrition);

    res.json({ totalNutrition });
  } catch (error) {
    console.error("Error fetching nutrition data", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default getNutrients;
