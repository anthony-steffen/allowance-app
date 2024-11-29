const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

const router = express.Router();

// Rota para Registro
router.post('/register', registerUser);

// Rota para Login
router.post('/login', loginUser);

// Rota para Logout
router.post('/logout', logoutUser);

module.exports = router;