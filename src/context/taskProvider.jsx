// taskProvider.jsx
import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import TaskContext from './taskContext';
import { dailyTasks } from '../shared/tasks';

const { Provider } = TaskContext;

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Função para carregar tarefas diárias ao clicar em um botão
  const loadDailyTasks = () => {
    setTasks(dailyTasks.map(task => ({ ...task, isCompleted: false })));
    setLoaded(true);
  };

  // Função para alternar o status de conclusão de uma tarefa
  const toggleTaskCompletion = taskId => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  //Função para botão de concluir todas as tarefas
  const completeAllTasks = () => {
    setTasks(prevTasks =>
      prevTasks.map(task => ({ ...task, isCompleted: true }))
    );
  };

  const store = useMemo(() => ({
    tasks,
    loaded,
    loadDailyTasks,
    toggleTaskCompletion,
    completeAllTasks,
  }), [tasks, loaded]);

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
