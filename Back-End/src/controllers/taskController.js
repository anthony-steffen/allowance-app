const { Task } = require('../models');
const {Punishment} = require('../models');

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
const getAllTasks = async (_req, res) => {
  try {
    const tasks = await Task.findAll({
      attributes: ['id', 'title', 'description', 'dueDate', 'value', 'status'],
    });
    const newTasks = tasks.map((task) => {
      return {
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate.toLocaleDateString("pt-BR"),
        value: task.value,
        status: task.status,
      };
    });
    res.status(200).json(newTasks);
  }
  catch (error) {
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

// Obter as tarefas diárias do usuário logado
const getDailyTasks = async (req, res) => {
  try {
    const { userId } = req.user; // Supondo que o middleware de autenticação adicione userId ao req
    const tasks = await Task.findAll({
      where: { userId, dueDate: new Date().toLocaleDateString("pt-BR").split('T')[0] }, // Filtra por usuário e data de vencimento
      attributes: ['id', 'title', 'description', 'dueDate', 'value', 'status'],
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar as tarefas diárias.', error });
  }
};

// Alternar status de conclusão da tarefa
const toggleTaskCompletion = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    task.status = task.status === 'completed' ? 'pending' : 'completed';
    await task.save();
    res.status(200).json({ message: 'Status da tarefa atualizado com sucesso!', task });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar status da tarefa.', error });
  }
};

// Concluir todas as tarefas de um usuário
const completeAllTasks = async (_req, res) => {
  try {
    const [affectedRows] = await Task.update(
      { status: 'completed' },
      { where: { status: 'pending' } }
    );
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Nenhuma tarefa pendente encontrada.' });
    }
    res.status(200).json({ message: 'Todas as tarefas foram concluídas com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao concluir as tarefas.', error });
  }
};

  
// Solicitar aprovação das tarefas concluídas e penalidades adicionadas
const requestTaskApproval = async (req, res) => {
 
  try {
    // Buscar todas as tarefas concluídas
    const completedTasks = await Task.findAll({
      where: { status: 'completed' },
      attributes: ['id', 'title', 'description', 'value', 'dueDate', 'status'],
    });

    // Buscar todas as penalidades
   const punishment = await Punishment.findAll({
     where: { add: true },
     attributes: ['id', 'describe', 'value', 'add', 'dueDate'],
    });

    const requestToApproval = [...completedTasks, ...punishment];
    // Simular o envio da aprovação (exemplo de objeto estruturado para envio)
    const approvalRequest = {
      tasks: completedTasks,
      penalties: punishment,
    };

    res.status(200).json(approvalRequest);
  }
  catch (error) {
    res.status(500).json({ message: 'Erro ao solicitar aprovação.', error });
  }
}

// Resetar as tarefas para os valores iniciais no banco de dados
const resetTasks = async (req, res) => {
  try {
    await Task.update(
      { status: 'pending' },
      { where: { status: 'completed' } }
    );
    res.status(200).json({ message: 'Tarefas resetadas com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao resetar as tarefas.', error });
  }
}
 
module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getDailyTasks,
  toggleTaskCompletion,
  completeAllTasks,
  requestTaskApproval,
  resetTasks,
};