import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import TaskContext from './taskContext';
import { dailyTasks } from '../shared/tasks';

const { Provider } = TaskContext;

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [taskHistory, setTaskHistory] = useState([]); // Histórico de tarefas concluídas

  // Função para carregar tarefas diárias ao clicar em um botão
  const loadDailyTasks = useCallback (() => {
    setTasks(dailyTasks.map(task => ({ ...task})));
    setLoaded(true);

  }, []);

 

  // Função para alternar o status de conclusão de uma tarefa
  const toggleTaskCompletion = taskId => {
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

  //Salva as tarefas concluidas no taskHistory

  const recordCompletedTasks = useCallback(() => {
    const completedTasks = tasks.filter(task => task.done);
    const dailyTotal = completedTasks.reduce((acc, task) => acc + task.value, 0);
    if (taskHistory){
    setTaskHistory(prevHistory => [
      ...prevHistory,
      {
        date: Date.now(),
        dailyTotal,
        tasks: completedTasks,
        requestedApproval: true,
        approved: false,
      },
    ]);
    //Remove todas as tarefas
    setTasks([]);
    setLoaded(false);
  } else {
    setTaskHistory(console.log('Não há tarefas concluidas'));
  }
  }
  , [tasks, taskHistory]);

    

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
