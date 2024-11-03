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
  }
  );
  
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
    setSendToApproval( [
      {
        date: today,
        dailyReward,
        completed,
        notCompleted,
        approved: false,
      },
    ]);
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
  const finalApprove = sendToApproval.slice().map(record => {
    if (record.date === new Date().toLocaleDateString('pt-BR')) {
      record.approved = true;

      setApproved([...approved, record]);
      
      toast({
        title: 'Sucesso!',
        description: 'Tarefas aprovadas.',
        status: 'success',
        position: 'center',
        duration: 3000,
        isClosable: true,
      });
    }else{(
      toast({
        title: 'Erro',
        description: 'Não há tarefas para aprovar.',
        status: 'error',
        position: 'center',
        duration: 3000,
        isClosable: true,
      })
    )}
    return record;
  }
  );
  setSendToApproval(finalApprove);
}, [sendToApproval, approved, toast]);

  const store = useMemo(() => ({
    tasks,
    loaded,
    approved,
    approveTask,
    loadDailyTasks,
    toggleTaskCompletion,
    completeAllTasks,
    sendToApproval,
    recordCompletedTasks,
  }), [
    tasks,
    loaded,
    approved,
    sendToApproval,
    loadDailyTasks,
    recordCompletedTasks,
    approveTask,  
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
