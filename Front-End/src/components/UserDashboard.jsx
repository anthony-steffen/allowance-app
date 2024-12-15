import { useContext } from "react";
import TaskContext from "../context/taskContext";
import { Button, Box, Text, Card } from "@chakra-ui/react";

const UserDashboard = () => {
  const { approvedTasks, handleRequestPayment } = useContext(TaskContext);

  const totalValue = approvedTasks.reduce((acc, task) => acc + task.netValue, 0);

  return (
      <Card
      bg={"yellow.100"}
      color={"black"}
      p={5} 
      borderWidth="1px" 
      borderRadius="md" 
      textAlign={"center"}  
      textShadow={"2px 1px 2px white"}
      w={{ base: "90%", md: "60%", lg: "20%" }}
      >
        <Text fontSize="xl" fontWeight="bold">Painel do Usuário</Text>
        <Box my={1}>
          {approvedTasks.map((task, index) => (
            <Box key={index} borderBottom="1px" borderColor="gray.300" py={2}>
              <Text>Data: {task.date}</Text>
              <Text>Valor das tarefas: R$ {task.netValue.toFixed(2)}</Text>
            </Box>
          ))}
        </Box>
        <Text fontWeight="bold" my={4}>
          Valor Acumulado: R$ {totalValue.toFixed(2)}
        </Text>
        <Button
          m='auto'
          w={{ base: "80%", md: "50%", lg: "50%" }}
          colorScheme="teal"
          onClick={() => handleRequestPayment()}
          isDisabled={totalValue === 0}
        >
          Solicitar Pagamento
        </Button>
      </Card>
  );
};

export default UserDashboard;