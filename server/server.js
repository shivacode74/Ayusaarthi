const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Ye React (frontend) se connection ke liye zaroori hai

// Define Routes
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/doctors', require('./routes/doctorRoute'));
app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Base route
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});