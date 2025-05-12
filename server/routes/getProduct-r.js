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
// getProduct.get("/product-with-nutrients", async (req, res) => {
//   try {
//     const results = await Product.getAllProductsWithNutrients();
//     // console.log("Test results: ", results);
//     res.json(results);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send(error.message);
//   }
// });
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

getProduct.get("/product-with-nutrients", async (req, res) => {
  try {
    const { fat, saturates, sugars, salt, category, currentPage, limit } =
      req.query;

    const filteredProductNutrients = await Product.getFilteredProductNutrients(
      fat,
      saturates,
      sugars,
      salt,
      category,
      currentPage,
      limit
    );
    // console.log("Filtered product nutrients: ", filteredProductNutrients);
    res.status(200).json(filteredProductNutrients);
  } catch (error) {
    console.error("Can't filter product nutrients", error);
    res
      .status(500)
      .send("Internal Server Error when filtering product nutrients");
  }
});

getProduct.get("/product-nutrients/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    // console.log(productId);

    const product = await Product.getProductNutrients(productId);
    // console.log(`Retrieving product details of ${productId}: `, product);
    res.json(product);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
});

getProduct.get("/products-nutrients/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    // console.log(productId);

    const product = await Product.getProductsNutrients(productId);
    // console.log(`Retrieving product details of ${productId}: `, product);
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
  const { level0 } = req.query;
  try {
    const products = await Product.getFilteredProductNutrients(level0);
    res.json(products);
  } catch (error) {
    console.error("Error fetching filtered foods:", error);
    res.status(500).send("Internal Server Error");
  }
});
export default getProduct;
