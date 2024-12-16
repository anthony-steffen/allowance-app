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

const includePunishmentToggle = async (req, res) => {
  try {
    const { id } = req.params;
    const { describe, value, add, dueDate } = req.body;
    const punishment = await Punishment.findByPk(id);
    if (!punishment) {
      return res.status(404).json({ message: 'Punição não encontrada.' });
    }
    await punishment.update({ describe, value, add, dueDate });
    res.status(200).json({ message: 'Punição atualizada com sucesso!', punishment });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar punição.', error });
  }
}

module.exports = {
  getAllPunishments,
  includePunishmentToggle,
};