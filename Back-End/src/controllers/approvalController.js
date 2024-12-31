const { Approval, SendToApproval } = require('../models');

// Função para Buscar todas as aprovações
const getApprovals = async (_req, res) => {
  try {
    const approvals = await SendToApproval.findAll();
    res.status(200).json(approvals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar aprovações', message: error.message });
  }
}

// Função para criar uma nova aprovação
const createApproval = async (req, res) => {
  try {
    const { date, tasks, penalties, netValue } = req.body;
    const approval = await Approval.create({ date, tasks, penalties, netValue });
    res.status(201).json({ message: 'Aprovação criada com sucesso', approval });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar aprovação', message: error.message });
  }
}

// Função para enviar uma solicitação de aprovação para o back-end
const sendApprovalRequest = async (req, res) => {
  try {
    const { tasks } = req.body;
    const approval = await SendToApproval.create({ tasks });
    res.status(201).json({ message: 'Solicitação de aprovação enviada com sucesso', approval });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao enviar solicitação de aprovação', message: error.message });
  }
}

module.exports = { createApproval,sendApprovalRequest, getApprovals };