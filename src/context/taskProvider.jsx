// TaskProvider.jsx
import { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import TaskContext from './taskContext';
import { dailyTasks } from '../shared/tasks';
import { useToast } from '@chakra-ui/react';

const { Provider } = TaskContext;

const TaskProvider = ({ children }) => {

  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [approvalRequested, setApprovalRequested] = useState(false);
  const [lastLoadDate, setLastLoadDate] = useState(() => {
    const savedDate = localStorage.getItem('lastLoadDate');
    return savedDate ? savedDate : [];
  });
  const [taskHistory, setTaskHistory] = useState(() => {
    const savedHistory = localStorage.getItem('taskHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  }); // Histórico de tarefas concluídas

  const toast = useToast();

  
  // Função para carregar tarefas diárias ao clicar em um botão
  const loadDailyTasks = useCallback(() => {
 
    const today = new Date().toISOString().split('T')[0];

    // Verifica se as tarefas já foram carregadas hoje ou se aprovação foi solicitada
    if (lastLoadDate === today || approvalRequested) {
      toast({
        title: 'Erro',
        description: 'As tarefas de hoje já foram carregadas.',
        status: 'error',
        position: 'center',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setTasks(dailyTasks);
    setLoaded(true);
    setLastLoadDate(today);
    localStorage.setItem('lastLoadDate', today);
  }, [lastLoadDate, approvalRequested, toast]);

  
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
    const notCompletedTasks = tasks.filter(task => !task.done);
    const dailyTotal = completedTasks.reduce((acc, task) => acc + task.value, 0);
    const today = new Date().toISOString().split('T')[0];

    // Verifica se já foi solicitada a aprovação das tarefas de hoje
    if (taskHistory.some(record => record.date === today)) {
      toast({
        title: 'Erro',
        description: 'Você já solicitou a aprovação das tarefas de hoje.',
        status: 'error',
        position: 'center',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setTaskHistory(prevHistory => [
      ...prevHistory,
      {
        date: today,
        tasks: [{ completedTasks, notCompletedTasks }],
        dailyTotal,
        requestedApproval: true,
        completedTasks,
        notCompletedTasks,
        approved: false,
      },
    ]);

    setApprovalRequested(true);
    toast({
      title: 'Sucesso!',
      description: 'Solicitação enviada para aprovação.',
      status: 'success',
      position: 'center',
      duration: 3000,
      isClosable: true,
    });
    setLoaded(false);
    setTasks([]);
  }, [tasks, taskHistory, toast]);


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
