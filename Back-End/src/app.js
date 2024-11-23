require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Middleware to enable CORS
app.use('/auth', authRoutes); // Middleware to use authRoutes
app.use('/tasks', taskRoutes); // Middleware to use taskRoutes
app.use('/users', userRoutes); // Middleware to use userRoutes


// Route Test - GET
app.get('/', (_req, res) => {
  res.send('Allowance API is working!');
});


module.exports = app;