const { Approval, SendToApproval } = require('../models');

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

// Função para remover todos os registros de aprovação
const deleteAllApprovals = async (req, res) => {
  try {
    await Approval.destroy({ where: {} });
    res.status(200).json({ message: 'Registros de aprovação removidos com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover registros de aprovação', message: error.message });
  }
}

module.exports = { createApproval,sendApprovalRequest };