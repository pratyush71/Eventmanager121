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
    return res.status(403).send('Access denied');
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

// Create Event
router.post('/create', verifyToken, async (req, res) => {
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
router.get('/', verifyToken, async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.userId }); // Fetch events by user
    res.json(events);
  } catch (error) {
    res.status(500).send('Error fetching events');
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
