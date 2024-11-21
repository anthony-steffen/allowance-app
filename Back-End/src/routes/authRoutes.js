const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Rota para Registro
router.post('/register', registerUser);

// Rota para Login
router.post('/login', loginUser);

module.exports = router;