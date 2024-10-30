// Home.jsx
import { useContext } from 'react';
import {useColorMode, Button, Card, CardBody, CardFooter, CircularProgress, CircularProgressLabel, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import TaskContext from '../context/taskContext';

import {CheckCircleIcon, WarningIcon, } from '@chakra-ui/icons';

const Home = () => {
  const { tasks, loadDailyTasks, toggleTaskCompletion } = useContext(TaskContext);

  const progress = tasks.filter(task => task.isCompleted).length / tasks.length * 100;

  const colorMode = useColorMode();

  return (
    <Flex p={6} maxW="800px" mx="auto" direction="column">
      <Heading as="h1" size="lg" mb={4} textAlign="center" color="teal.600">
        Minhas Tarefas Diárias
      </Heading>
      <Flex justifyContent="space-between" alignItems="center" mb={4} direction={{base: 'column', md: 'row'}} gap={4}>
      {/* Botão para carregar as tarefas diárias */}
        <Button colorScheme="teal" maxW='140px' onClick={loadDailyTasks}>
          Carregar Tarefas
        </Button>

      <Flex alignItems="center" justifyContent="space-around" w='100%'>
        <Text fontSize="lg" fontWeight="bold" color="teal.600" textAlign="center">
          {`Recompensa: ${tasks.reduce((acc, task) => acc + (task.isCompleted ? task.value : 0), 0).toFixed(2)}`}
        </Text>

        <CircularProgress 
        value={progress} 
        color={ progress <=25 ? 'red.500' : progress <= 50 ? 'yellow.500' : progress <= 75? 'blue.500' : 'green.500'}
        size={{base: '50px', md: '60px'}}
        >
          <CircularProgressLabel 
          color={colorMode.colorMode === 'dark' ? 'white' : 'black'}
          fontWeight={'bold'} 
          fontSize={'sm'}>
          {progress ? `${progress.toFixed(0)}%` : '0%'}
          </CircularProgressLabel>
        </CircularProgress>
        </Flex>
      </Flex>

      {tasks.map(task => (
        <Card key={task.id} mb={4}>
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
            {task.isCompleted ? (
              <Flex alignItems="center" justifyContent="center" direction={'column'} gap={2}>
              <CheckCircleIcon color="green.500" boxSize={6} />
              <Text>Concluído</Text>
            </Flex>
            ) : (
              <Flex alignItems="center" justifyContent="center" direction={'column'} gap={2}>
              <WarningIcon color="yellow.500" boxSize={6} />
              <Text>Pendente</Text>
            </Flex>
            )}

              <Flex alignItems="center" justifyContent="center" direction={'column'}>
                <Text>Reward</Text>
                <Text color="teal.600" fontSize="md" fontWeight="bold">
                  {task.isCompleted ? `R$ ${task.value.toFixed(2)}` : `R$ ${0.00.toFixed(2)}`}
                </Text>
              </Flex>
              <Button
                variant="solid"
                colorScheme={task.isCompleted ? 'green' : 'blue'}
                onClick={() => toggleTaskCompletion(task.id)}
                maxW={'90px'}
                size={'md'}
              >
                {task.isCompleted ? 'Concluído' : 'Concluir'}
              </Button>
          </CardFooter>
        </Card>
      ))}
    </Flex>
  );
}

export default Home;
