const express = require("express");
const UserData = require("../models/UserData");

const router = express.Router();

router.get("/analytics", async (req, res) => {
  try {
    const data = await UserData.find().sort({ timestamp: -1 }).limit(100);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics data" });
  }
});

module.exports = router;
