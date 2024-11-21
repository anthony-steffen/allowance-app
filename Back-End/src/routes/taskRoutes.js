const express = require('express');
const authenticate  = require('../middlewares/authMiddleware');

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
}
  = require('../controllers/taskController');

const router = express.Router();

router.post('/', authenticate, createTask); // Criar uma tarefa, requer autenticação

router.get('/', getAllTasks); // lista tarefas, requer autenticação

router.get('/:id', authenticate, getTaskById); // lista tarefa por id, requer autenticação

router.put('/:id', authenticate, updateTask); // Atualiza tarefa por id, requer autenticação

router.delete('/:id', authenticate, deleteTask); // Deleta tarefa por id, requer autenticação

module.exports = router;