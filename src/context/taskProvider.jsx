import { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import TaskContext from './taskContext';
import { dailyTasks } from '../shared/tasks';
import { useToast } from '@chakra-ui/react';

const { Provider } = TaskContext;

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [loaded, setLoaded] = useState(false);
  const [lastLoadDate, setLastLoadDate] = useState(() => {
    const savedDate = localStorage.getItem('lastLoadDate');
    return savedDate ? savedDate : '';
  });
  const [sendToApproval, setSendToApproval] = useState(() => {
    const savedHistory = localStorage.getItem('sendToApproval');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [approved, setApproved] = useState(() => {
    const savedApproved = localStorage.getItem('Approved');
    return savedApproved ? JSON.parse(savedApproved) : [];
  });
  const [selectedPenalties, setSelectedPenalties] = useState([]);
  const toast = useToast();

  const loadDailyTasks = useCallback(() => {
    const today = new Date().toLocaleDateString('pt-BR');
    if (lastLoadDate === today) {
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
    localStorage.setItem('tasks', JSON.stringify(dailyTasks)); // Persiste as tarefas
    localStorage.setItem('lastLoadDate', today);
  }, [lastLoadDate, toast]);

  const toggleTaskCompletion = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  const togglePenalty = (penalty) => {
    setSelectedPenalties((prev) => {
      const exists = prev.some((p) => p.id === penalty.id);
      return exists ? prev.filter((p) => p.id !== penalty.id) : [...prev, penalty];
    });
  };

  const completeAllTasks = () => {
    setTasks(prevTasks => prevTasks.map(task => ({ ...task, done: true })));
  };

  const recordCompletedTasks = useCallback(() => {
    const completed = tasks.filter(task => task.done);
    const notCompleted = tasks.filter(task => !task.done);
    const dailyReward = completed.reduce((acc, task) => acc + task.value, 0);
    const today = new Date().toLocaleDateString('pt-BR');

    // Verifica se já foi solicitada a aprovação das tarefas de hoje
    if (sendToApproval.some(record => record.date === today)) {
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

    const newApproval = { date: today, dailyReward, completed, notCompleted, approved: false };
    setSendToApproval(prev => [...prev, newApproval]);
    setSelectedPenalties([]);
    setLoaded(false);
    setTasks([]);
    localStorage.removeItem('tasks'); // Remove as tarefas carregadas
    toast({
      title: 'Sucesso!',
      description: 'Solicitação enviada para aprovação.',
      status: 'success',
      position: 'center',
      duration: 3000,
      isClosable: true,
    });
  }, [tasks, sendToApproval, toast]);

  useEffect(() => {
    localStorage.setItem('sendToApproval', JSON.stringify(sendToApproval));
    localStorage.setItem('Approved', JSON.stringify(approved));
  }, [sendToApproval, approved]);

  const approveTask = useCallback(() => {
    setSendToApproval((prevApproval) =>
      prevApproval.map((record) => ({ ...record, approved: true }))
  );
    const approvedTasks = sendToApproval.map((task) => ({
      ...task,
      penalties: selectedPenalties,
      approved: true,
    }));
    setApproved(approvedTasks);
    localStorage.setItem('Approved', JSON.stringify(approvedTasks));
    setSelectedPenalties([]);
    toast({
      title: 'Sucesso!',
      description: selectedPenalties.length > 0
        ? 'Tarefas aprovadas com penalidades!'
        : 'Tarefas aprovadas sem penalidades!',
      status: selectedPenalties.length > 0 ? 'warning' : 'success',
      position: 'center',
      duration: 4000,
      isClosable: true,
    });
  }, [sendToApproval, selectedPenalties, toast]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const storedDate = localStorage.getItem('lastLoadDate');
    const today = new Date().toLocaleDateString('pt-BR');
    
    if (storedTasks && storedDate === today) {
      setTasks(storedTasks);
      setLoaded(true);
      setLastLoadDate(storedDate);
    }
  }, []);

  const store = useMemo(() => ({
    tasks,
    loaded,
    approved,
    approveTask,
    loadDailyTasks,
    toggleTaskCompletion,
    togglePenalty,
    completeAllTasks,
    sendToApproval,
    recordCompletedTasks,
    selectedPenalties,
  }), [tasks, loaded, approved, sendToApproval, loadDailyTasks, recordCompletedTasks, approveTask, selectedPenalties]);

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
