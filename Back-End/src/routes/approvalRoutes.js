const express = require('express');
const {getApprovals, createApproval, sendApprovalRequest} = require('../controllers/approvalController');

const router = express.Router();

// router.get('/', (_req, res) => {
//   res.send('Approval Routes');
// });

// Rota para buscar todas as aprovações
router.get('/', getApprovals);

// Rota para criar uma nova aprovação
router.post('/', createApproval);

// Rota para enviar uma solicitação de aprovação
router.post('/request', sendApprovalRequest);

module.exports = router;