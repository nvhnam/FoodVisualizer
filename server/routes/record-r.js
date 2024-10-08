import express from "express";
import Record from "../models/record-m.js";

const recordChoice = express.Router();

recordChoice.post("/rating", async (req, res) => {
  try {
    const { token, typeOfChart, date } = req.body;
    const recordId = await Record.createRecord(token, typeOfChart, date);
    res.status(201).json({ message: "Record created successfully", recordId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error creating record" });
  }
});

export default recordChoice;
