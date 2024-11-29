require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON
app.use(cors({
  origin: 'https://allowance-app-ten.vercel.app', // URL do front-end
  credentials: true, // Permite envio de cookies
}));
app.use(cookieParser()); // Middleware to parse cookies
app.use('/auth', authRoutes); // Middleware to use authRoutes
app.use('/tasks', taskRoutes); // Middleware to use taskRoutes
app.use('/users', userRoutes); // Middleware to use userRoutes


// Route Test - GET
app.get('/', (_req, res) => {
  res.send('Allowance API is working!');
});


module.exports = app;