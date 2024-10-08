import express from "express";
import CategoryModel from "../models/manageCategory-m.js";

const handleCategory = express.Router();

handleCategory.post("/category", async (req, res) => {
  try {
    const result = await CategoryModel.newCategory(req.body);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});
handleCategory.get("/category", async (req, res) => {
  try {
    const results = await CategoryModel.getAllCategory();
    res.send(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

handleCategory.get("/category/:productId", async (req, res) => {
  const product_id = req.params.productId;
  try {
    const result = await CategoryModel.getCategoryByProductId(product_id);
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

handleCategory.put("/category/:productId", async (req, res) => {
  const product_id = req.params.productId;
  try {
    const result = await CategoryModel.updateCategory(product_id, req.body);
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

handleCategory.delete("/category/:productId", async (req, res) => {
  const product_id = req.params.productId;
  try {
    const result = await CategoryModel.deleteCategory(product_id);
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

export default handleCategory;
