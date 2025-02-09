const express = require("express");
const Event = require("../models/event"); // ✅ Correct import
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// ✅ Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const tokenParts = token.split(" "); // Split "Bearer tokenvalue"
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(400).json({ message: "Invalid token format." });
    }

    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ JWT Verification Error:", error.message);
    res.status(400).json({ message: "Invalid token." });
  }
};

// ✅ Create Event (Emit to Clients)
router.post("/create-event", async (req, res) => {
  const { name, description, date, time, category } = req.body;

  if (!name || !description || !date || !time || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newEvent = new Event({ name, description, date, time, category });

    await newEvent.save();

    // ✅ Emit event update to all connected clients
    if (req.io) {
      req.io.emit("eventCreated", newEvent);
    }

    res.status(201).json({ message: "Event created", event: newEvent });
  } catch (error) {
    console.error("❌ Error creating event:", error);
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
});

// ✅ Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error("❌ Error fetching events:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Update Event (Emit Update)
router.put("/:id", verifyToken, async (req, res) => {
  const { name, description, date, time, category } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { name, description, date, time, category },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // ✅ Emit update event
    if (req.io) {
      req.io.emit("eventUpdated", updatedEvent);
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error("❌ Error updating event:", error);
    res.status(500).send("Error updating event");
  }
});

// ✅ Delete Event (Emit Deletion)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // ✅ Emit delete event
    if (req.io) {
      req.io.emit("eventDeleted", { id: req.params.id });
    }

    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    console.error("❌ Error deleting event:", error);
    res.status(500).send("Error deleting event");
  }
});

module.exports = router;
