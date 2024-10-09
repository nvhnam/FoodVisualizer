import express from "express";
const getNutrients = express.Router();

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

export default getNutrients;
