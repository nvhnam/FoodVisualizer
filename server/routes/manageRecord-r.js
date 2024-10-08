import express from "express";
import RecordModel from "../models/manageRecord-m.js";

const handleRecord = express.Router();

handleRecord.get("/records", async (req, res) => {
  try {
    const results = await RecordModel.getAllRecords();
    res.send(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

handleRecord.get("/records/:recordId", async (req, res) => {
  const record_id = req.params.recordId;
  try {
    const result = await RecordModel.getRecordById(record_id);
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

handleRecord.post("/records", async (req, res) => {
  try {
    const result = await RecordModel.newRecord(req.body);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

handleRecord.put("/records/:recordId", async (req, res) => {
  const record_id = req.params.recordId;
  try {
    const result = await RecordModel.updateRecord(record_id, req.body);
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

handleRecord.delete("/records/:recordId", async (req, res) => {
  const record_id = req.params.recordId;
  try {
    const result = await RecordModel.deleteRecord(record_id);
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});

export default handleRecord;
