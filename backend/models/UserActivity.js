const mongoose = require("mongoose");

const UserActivitySchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
  },
  element: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,  // Automatically set current date if not provided
  },
  userId: {
    type: String,
    required: true, // Make sure the user is tracked
  },
});

UserActivitySchema.index({ timestamp: 1 }); // Index on timestamp for faster queries

module.exports = mongoose.model("UserActivity", UserActivitySchema);
