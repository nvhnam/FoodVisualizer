import express from "express";
import ProductModel from "../models/manageProduct-m.js";

const handleProduct = express.Router();

handleProduct.post("/product", async (req, res) => {
  try {
    const result = await ProductModel.newProduct(req.body);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});
handleProduct.get("/product", async (req, res) => {
  try {
    const results = await ProductModel.getAllProducts();
    res.send(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

handleProduct.put("/product/:productId", async (req, res) => {
  const product_id = req.params.productId;
  try {
    const result = await ProductModel.updateProduct(product_id, req.body);
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

handleProduct.delete("/product/:productId", async (req, res) => {
  const product_id = req.params.productId;
  try {
    const result = await ProductModel.deleteProduct(product_id);
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

export default handleProduct;
