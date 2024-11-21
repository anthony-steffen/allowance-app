require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Middleware to enable CORS
app.use('/auth', authRoutes); // Middleware to use authRoutes


// Route Test - GET
// app.get('/', (_req, res) => {
//   res.send('Hello World!');
// });


module.exports = app;