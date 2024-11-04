import { useContext } from 'react';
import { useColorMode, Button, Card, CardBody, CardFooter, CircularProgress, CircularProgressLabel, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import TaskContext from '../context/taskContext';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';

import{ dailyReward }from '../shared/reward';

const Home = () => {
  const {
    sendToApproval,
    approved,
    tasks, 
    loaded, 
    loadDailyTasks,
    toggleTaskCompletion, 
    completeAllTasks, 
    recordCompletedTasks 
  } = useContext(TaskContext);
  const colorMode = useColorMode();

  const progress = tasks.filter(task => task.done).length / tasks.length * 100;
  const allCompleted = tasks.every(task => task.done);

  const today = new Date().toLocaleDateString('pt-BR');

  return (
    <Flex p={6} maxW="800px" mx="auto" direction="column">
      <Heading as="h1" size="lg" mb={4} textAlign="center" color="teal.600">
        Minhas Tarefas Diárias
      </Heading>
      <Heading as="h1" size="lg" mb={4} textAlign="center" color="teal.600">
        Mesada R$ {dailyReward(approved)}
      </Heading>

      {/* Exibe a mensagem de conclusão se a aprovação foi solicitada */}
      {sendToApproval.some(record => record.date === today) ? (
        <Text fontSize="lg" color="teal.600" textAlign="center" mt={6}>
          Parabéns por concluir suas tarefas, nos vemos amanhã!
        </Text>
      ) : (
        <>
          <Flex
            bg={colorMode.colorMode === 'dark' ? 'gray.700' : 'gray.100'} 
            p={4} 
            borderRadius={10} 
            boxShadow="md" 
            justifyContent="space-between"
            alignItems="center"
            mb={4}
            direction={{ base: 'column', md: 'row' }}
            gap={4}
          >
            <CircularProgress 
              value={progress} 
              color={ progress <= 30 ? 'red.500' : progress <= 60 ? 'yellow.500' : progress <= 99 ? 'blue.500' : 'green.500' }
              size={{ base: '50px', md: '60px' }}
            >
              <CircularProgressLabel 
                color={colorMode.colorMode === 'dark' ? 'gray.200' : 'black'}
                fontWeight={'bold'} 
                fontSize={'sm'}
              >
                {progress ? `${progress.toFixed(0)}%` : '0%'}
              </CircularProgressLabel>
            </CircularProgress>

            <Text fontSize="lg" fontWeight="bold" color="teal.600" textAlign="center">
              {`Recompensa/Diária: ${tasks.reduce((acc, task) => acc + (task.done ? task.value : 0), 0).toFixed(2)}`}
            </Text>

            <Button maxW="160px" onClick={recordCompletedTasks}>
              Solicitar Aprovação
            </Button>

            { !loaded ? (
              <Button maxW="140px" onClick={loadDailyTasks}>
                Carregar Tarefas
              </Button> 
            ) : (
              <Button
                maxW="140px"
                onClick={() => { completeAllTasks() }}
                bg={allCompleted ? 'teal.700' : 'black'}
                color={!allCompleted ? 'white' : 'yellow.100'}
              >
                {allCompleted ? 'Concluídas' : 'Concluir Todas'}
              </Button>
            )}
          </Flex>

          {tasks.map(task => (
            <Card 
            key={task.id} 
            mb={4} 
            bg={colorMode.colorMode === 'dark' ? 'gray.700' : 'gray.100'} 
            boxShadow="md"
            borderRadius={10} 
            >
              <CardBody>
                <Stack spacing={3}>
                  <Heading as="h2" size="md">{task.title}</Heading>
                  <Text>{task.description}</Text>
                  <Text color="teal.600" fontSize="2xl" fontWeight="bold">
                    {`R$ ${task.value.toFixed(2)}`}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter justifyContent="space-between" alignItems="center" p={3}>
                {task.done ? (
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

                <Flex alignItems="center" justifyContent="center" direction="column">
                  <Text>Reward</Text>
                  <Text color="teal.600" fontSize="md" fontWeight="bold">
                    {task.done ? `R$ ${task.value.toFixed(2)}` : `R$ ${0.00.toFixed(2)}`}
                  </Text>
                </Flex>
                <Button
                  variant="solid"
                  bg={task.done ? 'teal.700' : 'black'}
                  color={!task.done ? 'white' : 'yellow.100'}
                  onClick={() => toggleTaskCompletion(task.id)}
                  maxW="90px"
                  size="md"
                >
                  {task.done ? 'Concluído' : 'Concluir'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </>
      )}
    </Flex>
  );
};

export default Home;
