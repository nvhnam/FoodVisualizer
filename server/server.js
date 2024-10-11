import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config as dotenvConfig } from "dotenv";
import axios from "axios";
dotenvConfig();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Get all products in "product" table for UI
import getProduct from "./routes/getProduct-r.js";
app.use("/", getProduct);
import getNutrients from "./routes/getNutrients-r.js";
app.use("/", getNutrients);

// Get cart
import getCart from "./routes/getCart-r.js";
app.use("/", getCart);

// User
import authUser from "./routes/auth-r.js";
app.use("/auth", authUser);

// Admin
import handleProduct from "./routes/manageProduct-r.js";
app.use("/mng-product", handleProduct);

import handleNutrients from "./routes/manageNutrients-r.js";
app.use("/mng-nutrients", handleNutrients);

import handleCategory from "./routes/manageCategory-r.js";
app.use("/mng-category", handleCategory);

import handleRecord from "./routes/manageRecord-r.js";
app.use("/mng-record", handleRecord);

import handleUser from "./routes/manageUser-r.js";
app.use("/mng-user", handleUser);

import recordChoice from "./routes/record-r.js";
app.use("/record", recordChoice);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
