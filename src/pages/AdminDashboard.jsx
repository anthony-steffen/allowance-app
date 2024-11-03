import { useContext } from 'react';
import TaskContext from '../context/taskContext';
import {useColorMode, Text, Flex, Heading, List, ListItem, ListIcon, Container, Button } from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons';

const AdminDashboard = () => {
  const {sendToApproval, approveTask, rejectTask} = useContext(TaskContext);
  const mode = useColorMode();

  // achatando o array
  const finalAprove = sendToApproval.some(record => record.approved);



  return (  
    <Flex p={6} maxW="800px" mx="auto" direction="column">
      <Heading as="h1" size="lg" textAlign="center" color="teal.600">
        Painel de Administração
      </Heading>
    
      <Text fontSize="xl" color="teal.600" textAlign="center" my={4} fontWeight="bold">
        Histórico de Tarefas
      </Text>

      {!finalAprove && sendToApproval.map(task => (
        <Container bg={mode.colorMode === 'dark' ? 'gray.800' : 'gray.100'} p={4} borderRadius={8} boxShadow="md" key={task.date}>
          <Text fontSize="xl" color="teal.600" textAlign="center" my={4} fontWeight="bold">
            Tarefas do dia {task.date}
          </Text>
          <Text fontSize="md" color="teal.600" textAlign="center" fontWeight="bold">
            Valor da recompensa
            {task.dailyReward ? `: R$ ${task.dailyReward}` : ': R$ 0,00'}
          </Text>
          <List spacing={3} my={4}>
            {task.completed.map(task => (
                <ListItem key={task.id} color={mode.colorMode === 'dark' ? 'white' : 'gray.800'} fontWeight="bold" fontSize="md">
                  <Flex dir='row' align='center' justify='space-between'>
                    {task.title}
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                  </Flex>
                </ListItem>
              ))
            }
          </List>

          <List spacing={3} my={4}>
            {task.notCompleted.map(task => (
                <ListItem key={task.id} color={mode.colorMode === 'dark' ? 'white' : 'gray.800'} fontWeight="bold" fontSize="md">
                  <Flex dir='row' align='center' justify='space-between'>
                    {task.title}
                    <ListIcon as={CloseIcon} color="red.400" />
                  </Flex>
                </ListItem>
              ))
            }
          </List>

          <Flex justify="space-between" align='center' my={5} flexDir={'column'} gap={4}>
            <Button
              maxW="200px"
              onClick={approveTask}
              bg={'teal.700'}
              _hover={{ bg: 'teal.800' }}
            >
              Aprovar Tarefas
            </Button>
          
            <Button
              maxW="200px"
              onClick={rejectTask}
              bg={'red.500'}
              _hover={{ bg: 'red.600' }}
            >
              Rejeitar Tarefas
            </Button>
          </Flex>
        </Container>
      ))}

    </Flex>
  );
}

export default AdminDashboard;
