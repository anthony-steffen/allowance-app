const { Approval } = require('../models');

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

module.exports = {
  createApproval,
};