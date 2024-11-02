import { useContext } from 'react';
import TaskContext from '../context/taskContext';
import { Button, Card, Text, Flex } from '@chakra-ui/react';

const AdminDashboard = () => {
  const { taskHistory, approveTask, rejectTask } = useContext(TaskContext);

  console.log('taskHistory on AdminDashboard', taskHistory);
  return (
    <Flex direction="column" p={6}>
      <Text fontSize="xl" mb={4}>Registros Pendentes para Aprovação</Text>
      {taskHistory.filter(record => !record.approved && record.requestedApproval).map((record, index) => (
        <Card key={index} p={4} mb={4}>
          <Text fontWeight="bold">Data: {new Date(record.date).toLocaleDateString()}</Text>
          <Text>Total do Dia: R$ {record.dailyTotal.toFixed(2)}</Text>
          <Flex mt={4} justifyContent="space-between">
            <Button colorScheme="green" onClick={() => approveTask(index)}>
              Aprovar
            </Button>
            <Button colorScheme="red" onClick={() => rejectTask(index)}>
              Rejeitar
            </Button>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}

export default AdminDashboard;
