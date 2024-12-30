const express = require('express');
const { createApproval, sendApprovalRequest} = require('../controllers/approvalController');

const router = express.Router();

// router.get('/', (_req, res) => {
//   res.send('Approval Routes');
// });

// Rota para criar uma nova aprovação
router.post('/', createApproval);

// Rota para enviar uma solicitação de aprovação
router.post('/request', sendApprovalRequest);

module.exports = router;