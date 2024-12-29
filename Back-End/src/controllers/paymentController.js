const { PaymentRequest } = require('../models');

const createPaymentRequest = async (req, res) => {
  try {
    const { totalValue } = req.body;

    // Registrar solicitação no banco de dados (exemplo com Sequelize)
    const payment = await PaymentRequest.create({ value: totalValue, requestedAt: new Date() });

    res.status(201).json({ message: "Solicitação de pagamento registrada com sucesso.", payment });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar solicitação de pagamento.", error: error.message });
  }
};

module.exports = {
  createPaymentRequest,
};