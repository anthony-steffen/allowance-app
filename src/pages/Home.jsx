// Home.jsx
import { useContext } from 'react';
import { Alert, AlertIcon, Box, Button, Card, CardBody, CardFooter, CircularProgress, CircularProgressLabel, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import TaskContext from '../context/taskContext';

const Home = () => {
  const { tasks, loadDailyTasks, toggleTaskCompletion } = useContext(TaskContext);

  const progress = tasks.filter(task => task.isCompleted).length / tasks.length * 100;

  console.log(progress);


  return (
    <Box p={6} maxW="600px" mx="auto" bg="gray.100" borderRadius="md" boxShadow="lg">
      <Heading as="h1" size="lg" mb={4} textAlign="center" color="teal.600">
        Minhas Tarefas Diárias
      </Heading>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
      {/* Botão para carregar as tarefas diárias */}
      <Button colorScheme="teal" onClick={loadDailyTasks}>
        Carregar Tarefas Diárias
      </Button>
          <CircularProgress value={progress} color='green.400' size={{base: '50px', md: '60px'}}>
            <CircularProgressLabel color={'black'} fontWeight={'bold'} fontSize={'sm'}>
            {progress ? `${progress.toFixed(0)}%` : '0%'}
            </CircularProgressLabel>
          </CircularProgress>
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
            <Alert p={0} fontSize='sm' status={task.isCompleted ? 'success' : 'warning'} bg={'none'} width={'100px'}>
              <AlertIcon />
              {task.isCompleted ? 'Completed' : 'Waiting'}
            </Alert>
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
                maxW={'80px'}
                size={'sm'}
              >
                {task.isCompleted ? 'Concluído' : 'Concluir'}
              </Button>
          </CardFooter>
        </Card>
      ))}
    </Box>
  );
}

export default Home;
