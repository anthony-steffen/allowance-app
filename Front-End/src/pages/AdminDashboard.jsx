import { useContext } from "react";
import TaskContext from "../context/taskContext";
import {
  useColorMode,
  Text,
  Flex,
  Heading,
  List,
  ListItem,
  Button,
  Container,
  VStack,
} from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import BlackList from "../components/BlackList";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { sendToApproval, approveTask, toggleTaskStatus } = useContext(TaskContext);
  const mode = useColorMode();
  const navigate = useNavigate();

  const finalApprove = sendToApproval.some((record) => record.approved);

  return (
    <Flex p={3} maxW="800px" mx="auto" direction="column">
      <Heading
        my={3}
        as="h1"
        size="lg"
        textAlign="center"
        color={mode.colorMode === "dark" ? "teal.300" : "teal.600"}
      >
        Painel de Administração
      </Heading>

      {!finalApprove &&
        sendToApproval.map((task) => (
          <Container
            bg={mode.colorMode === "dark" ? "gray.700" : "gray.200"}
            p={3}
            borderRadius={10}
            border={mode.colorMode === "dark" ? "1px solid #343e4b" : "1px solid #cbd5e0"}
            boxShadow="md"
            key={task.date}
          >
            <Text
              fontSize="xl"
              color={mode.colorMode === "dark" ? "teal.400" : "teal.600"}
              textAlign="center"
              fontWeight="bold"
            >
              Tarefas do dia {task.date}
            </Text>
            <Text
              my={2}
              fontSize="xl"
              color={mode.colorMode === "dark" ? "teal.400" : "teal.600"}
              textAlign="center"
              fontWeight="bold"
            >
              Valor da recompensa
              {task.dailyReward ? `: R$ ${task.dailyReward.toFixed(2)}` : ": R$ 0,00"}
            </Text>

            {/* Tarefas Completas */}
            <List spacing={1} my={1}>
              {task.completed.map((taskItem) => (
                <ListItem
                  key={taskItem.id}
                  color={mode.colorMode === "dark" ? "white" : "gray.800"}
                  fontWeight="bold"
                  fontSize="sm"
                >
                  <Flex dir="row" align="center" justify="space-between">
                    <Text>{taskItem.title}</Text>
                    <Button
                      width={10}
                      size="sm"
                      onClick={() => toggleTaskStatus(task.date, taskItem.id,)}
                      variant="ghost"
                    >
                      {taskItem.done ? (
                        <CheckCircleIcon color="green.500" />
                      ) : (
                        <CloseIcon color="red.400" />
                      )}
                    </Button>
                  </Flex>
                </ListItem>
              ))}
            </List>

            {/* Tarefas Não Completas */}
            <List spacing={1}>
              {task.notCompleted.map((taskItem) => (
                <ListItem
                  key={taskItem.id}
                  color={mode.colorMode === "dark" ? "white" : "gray.800"}
                  fontWeight="bold"
                  fontSize="md"
                >
                  <Flex dir="row" align="center" justify="space-between">
                    <Text>{taskItem.title}</Text>
                    <Button
                      width={10}
                      size="sm"
                      onClick={() => toggleTaskStatus(task.date, taskItem.id)}
                      variant="ghost"
                    >
                      {taskItem.done ? (
                        <CheckCircleIcon color="green.500" />
                      ) : (
                        <CloseIcon color="red.400" />
                      )}
                    </Button>
                  </Flex>
                </ListItem>
              ))}
            </List>

            <Flex justify="space-around" align="center" my={4} flexDir={{ base: "column", md: "row" }} gap={2}>
              <Button
                maxW="150px"
                onClick={approveTask}
                bg={"teal.700"}
                _hover={{ bg: "teal.800" }}
              >
                Aprovar Tarefas
              </Button>
            </Flex>
          </Container>
        ))}
      {!finalApprove ? (
        <Flex justify="center" align="center" my={4}>
          <BlackList />
        </Flex>
      ) : (
        <VStack justify="center" align="center" my={4}>
          <Text align={"center"} fontSize="md" color={mode.colorMode === "dark" ? "teal.400" : "teal.600"}>
            Não há tarefas para aprovar.<br></br> Volte amanhã!
          </Text>
          <Button 
            onClick={() => navigate('/home')} 
            mx="auto"
            width={{ base: '50%', md: '20%' }}
            _hover={{ bg: 'teal.800' }}
          >
            Go Back!
          </Button>
        </VStack>
      )}
    </Flex>
  );
};

export default AdminDashboard;
