const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Music", "Sports", "Technology", "Art"], 
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // Ensure `time` is stored
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
