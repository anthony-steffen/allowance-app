// TaskProvider.jsx
import { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import TaskContext from './taskContext';
import { dailyTasks } from '../shared/tasks';

const { Provider } = TaskContext;

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [taskHistory, setTaskHistory] = useState(() => {
    const savedHistory = localStorage.getItem('taskHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  }); // Histórico de tarefas concluídas
  
  // Função para carregar tarefas diárias ao clicar em um botão
  const loadDailyTasks = useCallback(() => {
    setTasks(dailyTasks.map(task => ({ ...task })));
    setLoaded(true);
  }, []);
  
  // Função para alternar o status de conclusão de uma tarefa
  const toggleTaskCompletion = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  // Função para concluir todas as tarefas
  const completeAllTasks = () => {
    setTasks(prevTasks =>
      prevTasks.map(task => ({ ...task, done: true }))
    );
  };

  // Salva as tarefas concluídas no taskHistory
  const recordCompletedTasks = useCallback(() => {
    const completedTasks = tasks.filter(task => task.done);
    const dailyTotal = completedTasks.reduce((acc, task) => acc + task.value, 0);
    
    const newHistoryEntry = {
      date: Date.now(),
      dailyTotal,
      tasks: completedTasks,
      requestedApproval: true,
      approved: false,
    };

    setTaskHistory(prevHistory => [...prevHistory, newHistoryEntry]);
    setTasks([]);
    setLoaded(false);
  }, [tasks]);

  // Efeito para salvar o histórico no localStorage
  useEffect(() => {
    localStorage.setItem('taskHistory', JSON.stringify(taskHistory));
  }, [taskHistory]);

  // Funções para aprovar ou rejeitar a solicitação de tarefas
  const approveTask = (index) => {
    setTaskHistory(prevHistory =>
      prevHistory.map((record, i) =>
        i === index ? { ...record, approved: true } : record
      )
    );
  };

  const rejectTask = (index) => {
    setTaskHistory(prevHistory =>
      prevHistory.filter((_, i) => i !== index) // Remove o registro rejeitado
    );
  };


  const store = useMemo(() => ({
    tasks,
    loaded,
    approveTask,
    rejectTask,
    loadDailyTasks,
    toggleTaskCompletion,
    completeAllTasks,
    taskHistory,
    recordCompletedTasks,
  }), [
    tasks,
    loaded,
    taskHistory,
    loadDailyTasks,
    recordCompletedTasks,
  ]);

  return (
    <Provider value={store}>
      {children}
    </Provider>
  );
};

export default TaskProvider;

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
