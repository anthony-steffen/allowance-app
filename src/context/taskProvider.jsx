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
  const [lastLoadDate, setLastLoadDate] = useState(() => {
    const savedDate = localStorage.getItem('lastLoadDate');
    return savedDate ? savedDate : [];
  });
  const [sendToApproval, setSendToApproval] = useState(() => {
    const savedHistory = localStorage.getItem('sendToApproval');
    return savedHistory ? JSON.parse(savedHistory) : [];
  }); // Histórico de tarefas concluídas

  const [approved, setApproved] = useState(() => {
    const savedApproved = localStorage.getItem('Approved');
    return savedApproved ? JSON.parse(savedApproved) : [];
  });
  const [selectedPenalties, setSelectedPenalties] = useState([]);
  
  const toast = useToast();

  // Função para carregar tarefas diárias ao clicar em um botão
  const loadDailyTasks = useCallback(() => {
    const today = new Date().toLocaleDateString('pt-BR');
    // Verifica se as tarefas já foram carregadas hoje ou se aprovação foi solicitada
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
    localStorage.setItem('lastLoadDate', today);
  }, [lastLoadDate, toast]);

  
  // Função para alternar o status de conclusão de uma tarefa
  const toggleTaskCompletion = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  // Função para lidar com a seleção de penalidades
const togglePenalty = (penalty) => {
  setSelectedPenalties((prev) => {
    // Verifica se a penalidade já está na lista usando o id
    const exists = prev.some((p) => p.id === penalty.id);

    if (exists) {
      // Se já existe, remove a penalidade
      return prev.filter((p) => p.id !== penalty.id);
    } else {
      // Se não existe, adiciona a penalidade
      return [...prev, penalty];
    }
  });
};



  // Função para concluir todas as tarefas
  const completeAllTasks = () => {
    setTasks(prevTasks =>
      prevTasks.map(task => ({ ...task, done: true }))
    );
  };

  // Salva as tarefas concluídas no sendToApproval
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

    const newApproval = {
      date: today,
      dailyReward,
      completed,
      notCompleted,
      approved: false,
    };
    setSendToApproval(prev => [...prev, newApproval]);
    setSelectedPenalties([]); // Limpa as penalidades selecionadas

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
  }, [tasks, sendToApproval, toast]);


  // Efeito para salvar o histórico no localStorage
  useEffect(() => {
    localStorage.setItem('sendToApproval', JSON.stringify(sendToApproval));
    localStorage.setItem('Approved', JSON.stringify(approved));
  }, [sendToApproval, approved]);

// Função para aprovar tarefas sem alterar o histórico
const approveTask = useCallback(() => {
  setSendToApproval((prevApproval) =>
    prevApproval.map((record) => {
      if (record.completed.length > 0) {
        return { ...record, approved: true };
      }
      return record;
    }
  ));
  const approvedTasks = sendToApproval.map((task) => ({
    ...task,
    penalties: selectedPenalties,
    approved: true,
  }));
  setApproved(approvedTasks);
  localStorage.setItem('Approved', JSON.stringify(approvedTasks));
  setSelectedPenalties([]);
  if (selectedPenalties.length > 0) {
    toast({
      title: 'Sucesso!',
      description: 'Tarefas aprovadas com penalidades!',
      status: 'warning',
      position: 'center',
      duration: 4000,
      isClosable: true,
    });
  } else {
    toast({
      title: 'Sucesso!',
      description: 'Tarefas aprovadas sem penalidades!',
      status: 'success',
      position: 'center',
      duration: 3000,
      isClosable: true,
    });
  }
}
, [sendToApproval, selectedPenalties , toast]);


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
  }), [
    tasks,
    loaded,
    approved,
    sendToApproval,
    loadDailyTasks,
    recordCompletedTasks,
    approveTask,
    selectedPenalties,  
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
