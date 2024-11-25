const express = require('express');
const authenticate  = require('../middlewares/authMiddleware');

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getDailyTasks,
  toggleTaskCompletion,
  completeAllTasks,
  requestTaskApproval,
}
  = require('../controllers/taskController');

const router = express.Router();

//Rotas CRUD
router.post('/', authenticate, createTask); // Criar uma tarefa, requer autenticação
router.get('/', getAllTasks); // lista tarefas, requer autenticação
router.get('/:id', authenticate, getTaskById); // lista tarefa por id, requer autenticação
router.put('/:id', authenticate, updateTask); // Atualiza tarefa por id, requer autenticação
router.delete('/:id', authenticate, deleteTask); // Deleta tarefa por id, requer autenticação

//Rotas funcionais
router.get('/daily', getDailyTasks);
router.patch('/:id/toggle', toggleTaskCompletion);
router.post('/complete-all', completeAllTasks);
router.post('/request-approval', requestTaskApproval);

module.exports = router;