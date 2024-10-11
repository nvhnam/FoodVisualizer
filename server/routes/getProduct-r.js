import express from "express";
const getProduct = express.Router();

import Product from "../models/getProduct-m.js";

getProduct.get("/product", async (req, res) => {
  try {
    const product = await Product.getProduct();
    res.json(product);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
});
getProduct.get("/product-detail/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.getProductDetail(productId);
    res.json(product);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
});

getProduct.get("/product-nutrients/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    console.log(productId);

    const product = await Product.getProductNutrients(productId);
    res.json(product);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
});
getProduct.get("/categories", async (req, res) => {
  try {
    const categories = await Product.getCategory();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Internal Server Error");
  }
});
getProduct.get("/filter", async (req, res) => {
  const { id, level0 } = req.query;
  try {
    const products = await Product.getProductByIdOrCategory(id, level0);
    res.json(products);
  } catch (error) {
    console.error("Error fetching filtered foods:", error);
    res.status(500).send("Internal Server Error");
  }
});
export default getProduct;
