import { useContext } from "react";
import TaskContext from "../context/taskContext";
import { useColorMode, Text, Flex, Heading, List, Button, VStack, Card } from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import BlackList from "../components/BlackList";
import { API } from "../services/api";

const AdminDashboard = () => {
	const { sendToApproval, setSendToApproval, handleApproval, paymentRequest, handleWithdrawal } =
		useContext(TaskContext);
	const { colorMode } = useColorMode();


	const hundleToggleAproveTask = async (taskId) => {
		await API.patch(`/tasks/${taskId}/toggle`);

		const tasksToApproval = sendToApproval.map((task) =>
			task.id === taskId
				? {
						...task,
						status: task.status === "completed" ? "pending" : "completed",
				}
				: task
		);
		setSendToApproval(tasksToApproval);
	};

	// 	const tasksToApproval = sendToApproval.map((task) =>
	// 		task.id === taskId
	// 			? {
	// 					...task,
	// 					status: task.status === "completed" ? "pending" : "completed",
	// 			  }
	// 			: task
	// 	);
	// 	setSendToApproval(tasksToApproval.totalValue);
	// };

	// console.log(paymentRequest.totalValue);

	return (
		<VStack 
    p={2} 
    width={{ base: "100%" }} 
    mx="auto" 
    flexDir={"column"} 
    border={colorMode === "dark" ? "1px solid #343e4b" : "1px solid #cbd5e0"} 
    rounded={5}
    >
			{sendToApproval.length > 0 ? (
				<Flex
					align="center"
					width={{ base: "100%"}}
					direction="column"
					rounded={5}
          >
					<Heading as="h1" size="xl" textAlign="center" mt={6}>
						Admin Dashboard
					</Heading>
					<Text fontSize="xl" fontWeight="bold" textAlign={"center"} my={2} color={colorMode === "dark" ? "teal.300" : "gray.800"}>
						Tarefas para aprovação:
						<br />
						Data: {new Date().toLocaleDateString("pt-BR")}
					</Text>
					<List spacing={2}  width={{ base: "98%", md: "70%", lg: "30%" }}>
						{sendToApproval.length > 0 &&
							sendToApproval.map((task) => (
								<Card
									key={task.id}
									p={5}
                  gap={2}
									rounded={5}
                  textAlign={"center"}
									border={
										colorMode === "dark"
											? "1px solid #343e4b"
											: "1px solid #cbd5e0"
									}
                  >
   
									<Text>{task.description}</Text>
									{task.status === "completed" ? (
										<VStack>
											<CheckCircleIcon
												color="green.500"
												boxSize={{ base: 5, md: 6 }}
												onClick={() => hundleToggleAproveTask(task.id)}
											/>
											<Text fontSize={"sm"}> Aprovada</Text>
										</VStack>
									) : (
										<VStack>
											<CloseIcon
												color="red.500"
												boxSize={{ base: 5, md: 6 }}
												onClick={() => hundleToggleAproveTask(task.id)}
											/>
											<Text fontSize={"sm"}>Reprovada</Text>
										</VStack>
									)}
								</Card>
							))}
						<BlackList />
					</List>
					<Button 
          my={2}
          colorScheme="green"
          width={{ base: "50%", md: "40%", lg: "20%" }}
          onClick={handleApproval}
          >
						Enviar
					</Button>
				</Flex>
			) : (
				<Flex
					w={"100%"}
					h={"98vh"}
					flexDir={"column"}
					alignItems={"center"}
					border={
						colorMode === "dark" ? "1px solid #343e4b" : "1px solid #cbd5e0"
					}>
            <Heading as="h1" size="xl" textAlign="center" mt={6}>
						Admin Dashboard
					</Heading>
					<Text
						fontSize="xl"
						fontWeight="bold"
						my={2}
						textAlign="center"
						mt={10}
						p={2}
						color={"teal.300"}>
						Nenhuma tarefa para aprovar!
					</Text>
					{paymentRequest.totalValue && (
        <VStack mt={6} width={{ base: "90%", md: "70%", lg: "30%" }}>
          <Heading size="md">Solicitação de retirada</Heading>
						<Card p={3} width={{ base: "100%", md: "70%", lg: "30%" }} textAlign={"center"}>
							<Text>Usuário: {paymentRequest.userName}</Text>
							<Text>Valor: R$ {paymentRequest.totalValue}</Text>
							<Button
								m={'auto'}
								colorScheme="green"
								disabled={paymentRequest.totalValue ? false : true}
								onClick={() => handleWithdrawal()}
							>
								Pagar
							</Button>
						</Card>
				</VStack>
					)}
				</Flex>
			)}
			{/* Histórico de Solicitações */}
		</VStack>
     
	);
}

export default AdminDashboard;
