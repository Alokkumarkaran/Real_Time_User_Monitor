// backend/routes/activityRoutes.js
const express = require("express");
const UserActivity = require("../models/UserActivity");
const router = express.Router();

router.get("/logs", async (req, res) => {
  try {
    const logs = await UserActivity.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

module.exports = router;
