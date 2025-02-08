const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./db'); // Import the DB connection
const authRoutes = require('./routes/auth'); // Import auth routes
const eventRoutes = require('./routes/events'); // Import event routes

const app = express();
require('dotenv').config({ path: './.env' });


// Connect to MongoDB
connectDB().then(() => console.log('MongoDB Connected!')).catch(err => console.error('MongoDB Connection Error:', err));

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Use authentication routes
app.use('/api/auth', authRoutes);

// Use event management routes
app.use('/api/events', eventRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("server error",err.stack);
  res.status(500).json({ message:"server error",error:err.message || 'Server error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
