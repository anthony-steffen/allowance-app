const express = require('express');

const { createPaymentRequest } = require('../controllers/paymentController');

const router = express.Router();

// Rota para criar uma nova solicitação de pagamento
router.post('/', createPaymentRequest);

module.exports = router;