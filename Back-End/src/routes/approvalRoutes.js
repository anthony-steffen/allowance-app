const express = require('express');
const { createApproval } = require('../controllers/approvalController');

const router = express.Router();

// router.get('/', (_req, res) => {
//   res.send('Approval Routes');
// });

// Rota para criar uma nova aprovação
router.post('/', createApproval);

module.exports = router;