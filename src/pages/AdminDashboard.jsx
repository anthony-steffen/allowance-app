import { useContext } from 'react';
import TaskContext from '../context/taskContext';
import { Text, Flex, Heading, List, ListItem, ListIcon, Container } from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons';

const AdminDashboard = () => {
  const { taskHistory} = useContext(TaskContext);


  // achatando o array
  const completedTasks = taskHistory.map(record => record.completedTasks).flat();
  const notCompletedTasks = taskHistory.map(record => record.notCompletedTasks).flat();
 
  return (
    <Flex p={6} maxW="800px" mx="auto" direction="column">
      <Heading as="h1" size="lg" textAlign="center" color="teal.600">
        Painel de Administração
      </Heading>

      <Text fontSize="2xl" color="teal.600" textAlign="center" my={4} fontWeight="bold">
        Histórico de Tarefas
      </Text>

    <Container bg={'gray.800'} p={4} borderRadius={8} boxShadow="md" maxW="800px" mx="auto">
      <List spacing={3} my={4}>
        {completedTasks.map(task => (
          <ListItem key={task.id} color="green.500" fontWeight="bold" fontSize="md">
            <ListIcon as={CheckCircleIcon} color="green.500" />
            {task.title}
          </ListItem>
        ))}
      </List>

      <List spacing={3}>
        {notCompletedTasks.map(task => (
          <ListItem key={task.id} color="red.400" fontWeight="bold" fontSize="md">
            <ListIcon as={CloseIcon} color="red.400" />
            {task.title}
          </ListItem>
        ))}
      </List>
    </Container>

    </Flex>
  );
}

export default AdminDashboard;
