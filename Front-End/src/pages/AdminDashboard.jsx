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
	VStack,
} from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import BlackList from "../components/BlackList";
// import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const {
    sendToApproval,
    setSendToApproval,
    penalties,
    setPenalties,
    handleApproval,
  } = useContext(TaskContext);
  const { colorMode } = useColorMode(); 
	// const navigate = useNavigate();

 const hundleToggleAproveTask = (taskId) => {
    const tasksToApproval = sendToApproval.map((task) =>
      task.id === taskId
        ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
        : task
    );
    const penaltiesToInclude = penalties.map((penalty) =>
      penalty.id === taskId
        ? { ...penalty, include: penalty.include === true ? false : true }
        : penalty
    );
    setSendToApproval(tasksToApproval);
    setPenalties(penaltiesToInclude);
  };

  // const handleSubmit = (taskId) => {
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) =>
  //       task.id === taskId
  //         ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
  //         : task
  //     )
  //   );
  // };


	return (
		<Flex direction="column" align="center" p={3} w="100%">
			<Heading as="h1" size="2xl" mb={5}>
				Admin Dashboard
			</Heading>
			<Flex />
			<Flex 
      align='center' 
      width={{ base: "100%", md: "70%" }}
      direction="column"
      border={
        colorMode === "dark"
          ? "1px solid #343e4b"
          : "1px solid #cbd5e0"
      }
      rounded={5}
      >
				<Text fontSize="xl" fontWeight="bold" textAlign={"center"} my={2} >
					Tarefas para aprovação:<br />
          Data: {new Date().toLocaleDateString('pt-BR')}
				</Text>
				<List spacing={1} width={"96%"} my={4}>
          {sendToApproval.map((task) => (
            <ListItem
              key={task.id}
              p={5}
              rounded={5}
              border={
                colorMode === "dark"
                  ? "1px solid #343e4b"
                  : "1px solid #cbd5e0"
              }
              display="flex"
              justifyContent="space-between"
              alignItems="center">
              <Text>{task.description}</Text>
              {task.status === "completed" ? (
                <VStack>
                <CheckCircleIcon color="green.500" boxSize={{base: 5, md: 6}} onClick={ () => hundleToggleAproveTask(task.id)}/>
                <Text fontSize={'sm'}> Aprovada</Text>
                </VStack>
              ) : (
                <VStack>
                <CloseIcon color="red.500" boxSize={{base: 5, md: 6}} onClick={ () => hundleToggleAproveTask(task.id)}/>
                <Text fontSize={'sm'}>Reprovada</Text>
                </VStack>
              )}
            </ListItem>
          ))}
      <BlackList />
        </List>
			</Flex>
			<Button
				mt={5}
				colorScheme="green"
				onClick={handleApproval}>
				Enviar
			</Button>
		</Flex>
	);
};

export default AdminDashboard;
