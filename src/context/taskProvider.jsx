// taskProvider.jsx
import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import TaskContext from './taskContext';

const { Provider } = TaskContext;

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Função para carregar tarefas diárias
    const loadTasks = () => {
      const dailyTasks = [
        { id: 1, title: 'Arrumar a cama', description: 'Arrumar a cama todos os dias', done: false },
        { id: 2, title: 'Escovar os dentes', description: 'Escovar os dentes após as refeições', done: false },
        { id: 3, title: 'Lavar a louça', description: 'Lavar a louça após as refeições', done: false },
        { id: 4, title: 'Estudar', description: 'Estudar todos os dias', done: false },
        { id: 5, title: 'Fazer exercícios', description: 'Fazer exercícios físicos todos os dias', done: false },
        { id: 6, title: 'Ler', description: 'Ler um livro todos os dias', done: false },
        { id: 7, title: 'Assistir aula', description: 'Assistir aula online', done: false },
      ];

      const currentDate = new Date();
      const expirationTime = new Date();
      expirationTime.setHours(23, 59, 59, 999);

      if (currentDate > expirationTime) {
        setTasks(dailyTasks.map(task => ({ ...task, isCompleted: false })));
      } else {
        setTasks(dailyTasks);
      }
    };

    loadTasks();
  }, []);

  const toggleTaskCompletion = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const store = useMemo(() => ({
    tasks,
    toggleTaskCompletion,
  }), [tasks]);

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
