const { Punishment } =  require('../models');

const getAllPunishments = async (req, res) => {
  try {
    const punishments = await Punishment.findAll({
      attributes: ['id', 'describe', 'value', 'add', 'dueDate'],
    });
    res.status(200).json(punishments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar as punições.', error });
  }
}

module.exports = {
  getAllPunishments,
};