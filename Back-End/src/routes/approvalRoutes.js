const express = require('express');
const { createApproval } = require('../controllers/approvalController');

const router = express.Router();

// Rota para criar uma nova aprovação
router.post('/', createApproval);

module.exports = router;