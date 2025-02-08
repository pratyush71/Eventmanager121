// routes/events.js
const express = require('express');
const Event = require('../models/event');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate'); 

const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const tokenParts = token.split(" "); // Split "Bearer tokenvalue"
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(400).json({ message: 'Invalid token format.' });
    }

    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(400).json({ message: 'Invalid token.' });
  }
};


// Create Event
router.post('/', authenticate, async (req, res) => {
  const { name, description, date, time, category } = req.body;
  const newEvent = new Event({
    name,
    description,
    date,
    time,
    category,
    userId: req.user.userId, // Use the logged-in user's ID
  });

  try {
    await newEvent.save();
    res.status(201).send('Event created');
  } catch (error) {
    res.status(500).send('Error creating event');
  }
});

// Get Events for a User
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// Update Event
router.put('/:id', verifyToken, async (req, res) => {
  const { name, description, date, time, category } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { name, description, date, time, category },
      { new: true }
    );
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).send('Error updating event');
  }
});

// Delete Event
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).send('Event deleted');
  } catch (error) {
    res.status(500).send('Error deleting event');
  }
});

module.exports = router;
