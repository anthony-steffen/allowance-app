require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const punishmentsRoutes = require('./routes/punishmentsRoutes');
const approvalRoutes = require('./routes/approvalRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON

// app.use(cors({
//   origin: ['http://localhost:5173', 'https://allowance-app-ten.vercel.app'], // URL do front-end
//   credentials: true, // Permite envio de cookies
// }));
app.use(cors({
  origin: 'https://allowance-app-ten.vercel.app', // URL do front-end
  credentials: true, // Permite envio de cookies
}));
app.use(cookieParser()); // Middleware to parse cookies
app.use('/auth', authRoutes); // Middleware to use authRoutes
app.use('/tasks', taskRoutes); // Middleware to use taskRoutes
app.use('/users', userRoutes); // Middleware to use userRoutes
app.use('/punishments', punishmentsRoutes); // Middleware to use punishmentsRoutes
app.use('/approvals', approvalRoutes); // Middleware to use approvalRoutes
app.use('/payments-request', paymentRoutes); // Middleware to use paymentRoutes


// Route Test - GET
app.get('/', (_req, res) => {
  res.send('Allowance API is working!');
});


module.exports = app;