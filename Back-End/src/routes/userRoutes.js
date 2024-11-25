const express = require('express');

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers); // Busca todos os usuários
router.get('/:id', getUserById); // Busca usuário por id
router.put('/:id', updateUser); // Atualiza usuário por id
router.delete('/:id', deleteUser); // Deleta usuário por id

module.exports = router;