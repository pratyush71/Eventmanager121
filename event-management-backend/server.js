const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./db'); // Import the DB connection
const authRoutes = require('./routes/auth'); // Import auth routes
const eventRoutes = require('./routes/events'); // Import event routes

const app = express();
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Use authentication routes
app.use('/api/auth', authRoutes);

// Use event management routes
app.use('/api/events', eventRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
