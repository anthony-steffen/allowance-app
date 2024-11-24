const { User } = require('../models');

// Buscar todos os usuários
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os usuários.', error });
  }
};

// Buscar um usuário por id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o usuário.', error });
  }
};

// Atualizar um usuário
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    await user.update({ name, email, password });
    res.status(200).json({ message: 'Usuário atualizado com sucesso!'});
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o usuário.', error });
  }
};

// Remover um usuário
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Usuário removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover o usuário.', error });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};