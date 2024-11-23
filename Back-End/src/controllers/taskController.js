const { Task } = require('../models');

// Criar uma nova tarefa
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, value, status, userId } = req.body;
    const task = await Task.create({ title, description, dueDate, value, status, userId });
    res.status(201).json({ message: 'Tarefa criada com sucesso!', task });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa.', error });
  }
};

// Obter todas as tarefas
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      attributes: ['id', 'title', 'description', 'dueDate', 'value', 'status'],
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar as tarefas.', error });
  }

};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
    res.status(200).json(task);
  }
  catch (error) {
    res.status(500).json({ message: 'Erro ao buscar a tarefa.', error });
  }
};

// Atualizar uma tarefa
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, value, status, userId } = req.body;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
    await task.update({ title, description, dueDate, value, status, userId });
    res.status(200).json({ message: 'Tarefa atualizada com sucesso!', task });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a tarefa.', error });
  }
};

// Remover uma tarefa
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
    await task.destroy();
    res.status(200).json({ message: 'Tarefa removida com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover a tarefa.', error });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};