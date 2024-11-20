require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Routes


// Route Test - GET
app.get('/', (_req, res) => {
  res.send('Hello World!');
});


module.exports = app;