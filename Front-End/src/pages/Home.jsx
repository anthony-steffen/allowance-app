// import { useContext } from 'react';
// import { 
//   useColorMode, 
//   Button, 
//   Card, 
//   CardBody, 
//   CardFooter, 
//   CircularProgress, 
//   CircularProgressLabel,
//   Flex, 
//   Heading, 
//   Stack, 
//   Text 
// } from '@chakra-ui/react';

// import TaskContext from '../context/taskContext';
// import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';

// import{ dailyReward }from '../shared/reward';
// import AuthAdminModal from '../components/AuthAdminModal';

// const Home = () => {

//   const progress = tasks.filter(task => task.done).length / tasks.length * 100;
//   const allCompleted = tasks.every(task => task.done);

//   const today = new Date().toLocaleDateString('pt-BR');
//   const mode = useColorMode();

//   return (
//     <Flex 
//     p={3} 
//     maxW="800px" 
//     mx="auto" 
//     direction="column"
//     >

//       <Heading as="h1" size="lg" mb={2} textAlign="center" color={mode.colorMode === 'dark' ? 'teal.300' : 'teal.600'}>
//         Minhas Tarefas Diárias
//       </Heading>
//       <Heading as="h1" size="lg" mb={3} textAlign="center" color={mode.colorMode === 'dark' ? 'teal.300' : 'teal.600'}>
//         Mesada R$ {dailyReward(approved)}
//       </Heading>

//       {/* Exibe a mensagem de conclusão se a aprovação foi solicitada */}
//       {sendToApproval.some(record => record.date === today) ? (
//       <Flex 
//       p={3} 
//       maxW="800px" 
//       mx="auto" 
//       direction="column" 
//       alignItems="center" 
//       gap={4}
//       >
//         <Text fontSize="lg" color={mode.colorMode === 'dark' ? 'teal.300' : 'teal.600'} textAlign="center">
//           Parabéns por concluir suas tarefas. <br></br>Volte amanhã!
//         </Text>

//        <AuthAdminModal />
//        </Flex>

//       ) : (
//         <>
//           <Flex
//             bg={colorMode.colorMode === 'dark' ? 'none' : 'gray.200'} 
//             p={4} 
//             borderRadius={10} 
//             border={ colorMode.colorMode === 'dark' ? '1px solid #343e4b' : '1px solid #cbd5e0' }
//             boxShadow="md" 
//             justifyContent="space-between"
//             alignItems="center"
//             mb={4}
//             direction={{ base: 'column', md: 'row' }}
//             gap={4}
//           >
//             <CircularProgress 
//               value={progress} 
//               color={ progress <= 30 ? 'red.500' : progress <= 60 ? 'yellow.500' : progress <= 99 ? 'blue.500' : 'green.500' }
//               size={{ base: '50px', md: '60px' }}
//             >
//               <CircularProgressLabel 
//                 color={colorMode.colorMode === 'dark' ? 'gray.200' : 'black'}
//                 fontWeight={'bold'} 
//                 fontSize={'sm'}
//               >
//                 {progress ? `${progress.toFixed(0)}%` : '0%'}
//               </CircularProgressLabel>
//             </CircularProgress>

//             <Text fontSize="lg" fontWeight="bold" color="teal.600" textAlign="center">
//               {`Recompensa/Diária: ${tasks.reduce((acc, task) => acc + (task.done ? task.value : 0), 0).toFixed(2)}`}
//             </Text>

//             <Button
//             disabled={!loaded || tasks.length === 0} 
//             maxW="160px" 
//             onClick={recordCompletedTasks}
//             >
//               Solicitar Aprovação
//             </Button>

//             { !loaded ? (
//               <Button maxW="140px" onClick={loadDailyTasks}>
//                 Carregar Tarefas
//               </Button> 
//             ) : (
//               <Button
//                 maxW="140px"
//                 onClick={() => { completeAllTasks() }}
//                 bg={allCompleted ? 'teal.700' : 'black'}
//                 color={!allCompleted ? 'white' : 'yellow.100'}
//               >
//                 {allCompleted ? 'Concluídas' : 'Concluir Todas'}
//               </Button>
//             )}
//           </Flex>

//           {tasks.map(task => (
//             <Card 
//             key={task.id} 
//             mb={4} 
//             bg={colorMode.colorMode === 'dark' ? 'gray.700' : 'gray.200'} 
//             boxShadow="md"
//             borderRadius={10}
//             border={ colorMode.colorMode === 'dark' ? '1px solid #343e4b' : '1px solid #cbd5e0' } 
//             >
//               <CardBody>
//                 <Stack spacing={3}>
//                   <Heading as="h2" size="md">{task.title}</Heading>
//                   <Text>{task.description}</Text>
//                   <Text color="teal.600" fontSize="2xl" fontWeight="bold">
//                     {`R$ ${task.value.toFixed(2)}`}
//                   </Text>
//                 </Stack>
//               </CardBody>
//               <CardFooter justifyContent="space-between" alignItems="center" p={3}>
//                 {task.done ? (
//                   <Flex alignItems="center" justifyContent="center" direction="column" gap={2}>
//                     <CheckCircleIcon color="green.500" boxSize={6} />
//                     <Text>Concluído</Text>
//                   </Flex>
//                 ) : (
//                   <Flex alignItems="center" justifyContent="center" direction="column" gap={2}>
//                     <WarningIcon color="yellow.500" boxSize={6} />
//                     <Text>Pendente</Text>
//                   </Flex>
//                 )}

//                 <Flex alignItems="center" justifyContent="center" direction="column">
//                   <Text>Reward</Text>
//                   <Text color="teal.600" fontSize="md" fontWeight="bold">
//                     {task.done ? `R$ ${task.value.toFixed(2)}` : `R$ ${0.00.toFixed(2)}`}
//                   </Text>
//                 </Flex>
//                 <Button
//                   variant="solid"
//                   bg={task.done ? 'teal.700' : 'black'}
//                   color={!task.done ? 'white' : 'yellow.100'}
//                   onClick={() => toggleTaskCompletion(task.id)}
//                   maxW="90px"
//                   size="md"
//                 >
//                   {task.done ? 'Concluído' : 'Concluir'}
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </>
//       )}
//     </Flex>
//   );
// };

// export default Home;
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";

import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { updateTaskStatus } from "../services/taskService";
import { API } from "../services/api";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { colorMode } = useColorMode();

  // const progress = tasks.filter(task => task.status === "completed").length / tasks.length * 100;

  // Função para carregar tarefas da API
  useEffect(() => {
      const fetchUpdatedTasks = async () => {
        const response = await API.get("/tasks");
        setTasks(response.data);
        setLoading(false);
      };
      setLoading(true);
      fetchUpdatedTasks();
  }, []);

  // Alterna o status de uma tarefa
  const handleToggleTask = async (taskId) => {
    try {
      // Atualiza o status da tarefa via API
      const response = await updateTaskStatus(taskId);
      const updatedTask = response.data;

      const fetchUpdatedTasks = async () => {
        const response = await API.get("/tasks");
        setTasks(response.data);
        setLoading(false);
      };
      fetchUpdatedTasks();

      // Atualiza imediatamente o estado das tarefas
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? { ...task, status: updatedTask.status } : task
        )
      );
    } catch (error) {
      // Exibe um toast de erro
      toast({
        title: "Erro ao atualizar tarefa.",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleCompleteAllTasks = async () => {
    try {
      const response = await API.post("/tasks/complete-all");
      toast({
        title: "Sucesso!",
        description: response.data.message,
        status: "success",
        duration: 3000,
      });
      // Atualiza o estado local com todas as tarefas como concluídas
      setTasks((prevTasks) =>
        prevTasks.map((task) => ({ ...task, status: 'completed' }))
      );
    } catch (error) {
      toast({
        title: "Erro ao completar tarefas.",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 3000,
      });
    }
  };

  // Filtra as tarefas concluídas e calcula o valor total
 const completedTasks = tasks.filter(task => task.status === "completed");
 const totalValue = completedTasks.reduce((acc, task) => acc + task.value, 0);



  return (
    <Flex p={3} maxW="800px" mx="auto" direction="column">
      <Heading as="h1" size="lg" mb={4} textAlign="center">
        Minhas Tarefas Diárias
      </Heading>
      <Heading as="h1" size="lg" mb={4} textAlign="center">
        Mesada R$ {totalValue}
      </Heading>

      <Button
        maxW="140px"
        bg={tasks.every(task => task.status === "completed") ? 'teal.700' : 'black'}
        color={!tasks.every(task => task.status === "completed") ? 'white' : 'yellow.100'}
        m={'auto'}
        mb={3}
        onClick={() => { handleCompleteAllTasks() }}  
      >
        {tasks.every(task => task.status === "completed") ? 'Concluídas' : 'Concluir Todas'}
      </Button>

      {loading ? (
        <Text textAlign="center">Carregando tarefas...</Text>
      ) : (
        tasks.map((task) => (
          <Card
            key={task.id}
            mb={4}
            bg={colorMode === "dark" ? "gray.700" : "gray.200"}
            boxShadow="md"
            borderRadius={10}
            border={
              colorMode === "dark"
                ? "1px solid #343e4b"
                : "1px solid #cbd5e0"
            }
          >
            <CardBody>
              <Stack spacing={3}>
                <Heading as="h2" size="md">{task.title}</Heading>
                <Text>{task.description}</Text>
                <Text color="teal.600" fontSize="2xl" fontWeight="bold">
                  {`R$ ${task.value}`}
                </Text>
              </Stack>
            </CardBody>
            <CardFooter justifyContent="space-between" alignItems="center" p={3}>
              {task.status === "completed" ? (
                <Flex alignItems="center" justifyContent="center" direction="column" gap={2}>
                  <CheckCircleIcon color="green.500" boxSize={6} />
                  <Text>Concluído</Text>
                </Flex>
              ) : (
                <Flex alignItems="center" justifyContent="center" direction="column" gap={2}>
                  <WarningIcon color="yellow.500" boxSize={6} />
                  <Text>Pendente</Text>
                </Flex>
              )}
              <Button
                variant="solid"
                bg={task.status === "pending" ? "black" : "teal.700"}
                color={task.status === "pending" ? "white" : "yellow.100"}
                onClick={() => handleToggleTask(task.id)}
                maxW="90px"
                size="md"
              >
                {task.status === "pending" ? "Concluir" : "Concluído"}
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </Flex>
  );
};

export default Home;

