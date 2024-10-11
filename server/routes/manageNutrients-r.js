import express from "express";
import NutrientsModel from "../models/manageNutrients-m.js";

const handleNutrients = express.Router();

handleNutrients.post("/nutrients", async (req, res) => {
  try {
    const result = await NutrientsModel.getAllNutrients(req.body);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});
handleNutrients.get("/nutrients", async (req, res) => {
  try {
    const results = await NutrientsModel.getAllNutrients();
    res.send(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

handleNutrients.put("/nutrients/:productId", async (req, res) => {
  const product_id = req.params.productId;
  try {
    const result = await NutrientsModel.updateNutrients(product_id, req.body);
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

handleNutrients.delete("/nutrients/:productId", async (req, res) => {
  const product_id = req.params.productId;
  try {
    const result = await NutrientsModel.deleteNutrients(product_id);
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

export default handleNutrients;
