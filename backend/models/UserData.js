const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,  // Ensure that userId is always provided
  },
  clicks: {
    type: Number,
    default: 0,  // Default to 0 if not specified
    min: 0,  // Ensure it's a non-negative value
  },
  scrollDepth: {
    type: Number,
    default: 0,  // Default to 0 if not specified
    min: 0,  // Ensure it's a non-negative value
  },
  sessionDuration: {
    type: Number,
    default: 0,  // Default to 0 if not specified
    min: 0,  // Ensure it's a non-negative value
  },
  timestamp: {
    type: Date,
    default: Date.now,  // Automatically set current date if not provided
  },
});

// Optional: Add index on userId for fast queries
UserDataSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model("UserData", UserDataSchema);
