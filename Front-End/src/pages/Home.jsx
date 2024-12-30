import { useContext } from "react";
import {
	VStack,
	CircularProgress,
	CircularProgressLabel,
	Button,
	Card,
	CardBody,
	CardFooter,
	Flex,
	Heading,
	Stack,
	Text,
	useColorMode,
	useToast,
} from "@chakra-ui/react";

import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import TaskContext from "../context/taskContext";
import UserDashboard from "../components/UserDashboard";
import { API } from "../services/api";

const Home = () => {
	const {
		tasks,
		setTasks,
		sendToApproval,
		setSendToApproval,
		tasksLoadedToday,
		paymentRequest,
		handleLoadTasks,
		handleToggleTask,
		handleCompleteAllTasks,
		loading,
	} = useContext(TaskContext);

	const today = new Date().toLocaleDateString("pt-BR");
	const toast = useToast();
	const { colorMode } = useColorMode();

	const completedTasks = tasks.filter((task) => task.status === "completed");
	const totalCompletedTasks = completedTasks.reduce((acc, task) => acc + task.value, 0);
	const totalValue = paymentRequest.reduce( (acc, task) => acc + task.netValue, 0);
	const sendValues = completedTasks.reduce((acc, task) => acc + task.value, 0).toFixed(2);
	const allTasksCompleted = tasks.every((task) => task.status === "completed");	
	const progress =
		tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
	

	// const handleApprovalRequest = async () => {
	// 	setSendToApproval(tasks);
	// 	setTasks([]);
	// 	// Salva a data de aprovação no localStorage
	// 	localStorage.setItem("approvalDate", today);
	// 	toast({
	// 		title: "Solicitação enviada para aprovação.",
	// 		description: `Você acumulou R$ ${totalCompletedTasks.toFixed(2)} hoje.`,
	// 		status: "success",
	// 		duration: 3000,
	// 	});
	// };
	
	const handleApprovalRequest = async () => {
		try {
			const { data } = await API.post("/approvals/request", { tasks: completedTasks });
			setTasks([]);
			setSendToApproval(data.approval.tasks);
			localStorage.setItem("approvalDate", today);
			toast({
				title: "Solicitação enviada para aprovação.",
				description: `Você acumulou R$ ${totalCompletedTasks.toFixed(2)} hoje.`,
				status: "success",
				duration: 3000,
			});
		} catch (error) {
			toast({
				title: "Erro ao enviar solicitação de aprovação.",
				description: error.message,
				status: "error",
				duration: 3000,
			});
		}
	}

	return (
		<VStack p={2} width={{ base: "100%" }} mx="auto" flexDir={"column"}>
			{/* Renderização Condicional: Mensagem de agradecimento ou Dashboard */}
			{sendToApproval ? (
				<Flex
					w={"100%"}
					h={"98vh"}
					flexDir={"column"}
					alignItems={"center"}
					border={
						colorMode === "dark" ? "1px solid #343e4b" : "1px solid #cbd5e0"
					}>
					<Flex
						flexDir={"column"}
						width={{ base: "100%", md: "100%", lg: "70%" }}
						mx="auto"
						mt={8}
						>
						<Heading
							as="h1"
							size="lg"
							mb={2}
							textAlign="center"
							color={colorMode === "dark" ? "teal.300" : "gray.800"}>
							Minhas Tarefas Diárias
						</Heading>
						<Heading
							as="h1"
							size="lg"
							textAlign="center"
							color={colorMode === "dark" ? "white" : "gray.800"}>
							Mesada R$ {totalValue.toFixed(2)}
						</Heading>
					</Flex>
					<Heading
						as="h1"
						size="md"
						textAlign="center"
						mt={4}
						p={2}
						color={colorMode === "dark" ? "teal.300" : "gray.800"}>
						Por hoje é só! <br />
						Volte amanhã para mais recompensas.
					</Heading>

					<UserDashboard/>

				</Flex>
			) : (
				<Flex
					flexDir={"column"}
					width={{ base: "100%", md: "100%", lg: "70%" }}
					mx="auto"
					mt={8}>
					<Heading
						as="h1"
						size="lg"
						mb={4}
						textAlign="center"
						color={colorMode === "dark" ? "teal.500" : "gray.800"}>
						Minhas Tarefas Diárias
					</Heading>
					<Heading
						as="h1"
						size="lg"
						mb={4}
						textAlign="center"
						color={colorMode === "dark" ? "white" : "gray.800"}>
						Mesada R$ {sendValues}
					</Heading>

					{/* Renderização Condicional: Botão de carregar tarefas */}
					{!tasksLoadedToday && (
						<Flex justifyContent="center">
							<Button
								maxW={"200px"}
								onClick={handleLoadTasks}
								isLoading={loading}
								loadingText="Carregando..."
								colorScheme="teal"
								mb={4}>
								Carregar Tarefas Diárias
							</Button>
						</Flex>
					)}
					<Flex
						width={{ base: "100%", md: "80%", lg: "50%" }}
						mx="auto"
						bg={colorMode === "dark" ? "none" : "gray.200"}
						p={4}
						borderRadius={10}
						border={
							colorMode === "dark" ? "1px solid #343e4b" : "1px solid #cbd5e0"
						}
						boxShadow="md"
						alignItems="center"
						mb={4}
						direction={{ base: "column", md: "row" }}
						gap={4}>
						<CircularProgress
							value={progress}
							color={
								progress <= 30
									? "red.500"
									: progress <= 60
									? "yellow.500"
									: "green.500"
							}
							size={{ base: "50px", md: "60px" }}>
							<CircularProgressLabel>
								{progress ? `${progress.toFixed(0)}%` : "0%"}
							</CircularProgressLabel>
						</CircularProgress>
						<Text ml={4} align={"center"}>
							{completedTasks.length} de {tasks.length} tarefas concluídas
						</Text>

						<Button
							maxW="170px"
							bg={allTasksCompleted ? "teal.500" : "black"}
							color={allTasksCompleted ? "yellow.100" : "white"}
							m={"auto"}
							onClick={handleCompleteAllTasks}
							disabled={allTasksCompleted}>
							{allTasksCompleted ? "Concluídas" : "Concluir Todas"}
						</Button>
						<Button
							disabled={tasks.length === 0}
							onClick={handleApprovalRequest}
							maxW="170px">
							Solicitar Aprovação
						</Button>
					</Flex>
					<Flex justifyContent="center" mb={4}>
					</Flex>

					{loading ? (
						<Text textAlign="center">Carregando tarefas...</Text>
					) : (
						tasks.map((task) => (
							<Card
								key={task.id}
								width={{ base: "100%", md: "80%", lg: "50%" }}
								mx={"auto"}
								mb={4}
								bg={colorMode === "dark" ? "gray.700" : "gray.200"}
								boxShadow="md"
								borderRadius={10}
								border={
									colorMode === "dark"
										? "1px solid #343e4b"
										: "1px solid #cbd5e0"
								}>
								<CardBody>
									<Stack spacing={3}>
										<Heading as="h2" size="md">
											{task.title}
										</Heading>
										<Text>{task.description}</Text>
										<Text color="teal.600" fontSize="2xl" fontWeight="bold">
											R$ {task.value}
										</Text>
									</Stack>
								</CardBody>
								<CardFooter
									justifyContent="space-between"
									alignItems="center"
									p={3}>
									{task.status === "completed" ? (
										<Flex
											alignItems="center"
											justifyContent="center"
											direction="column"
											gap={2}>
											<CheckCircleIcon color="green.500" boxSize={6} />
											<Text>Concluído</Text>
										</Flex>
									) : (
										<Flex
											alignItems="center"
											justifyContent="center"
											direction="column"
											gap={2}>
											<WarningIcon color="yellow.500" boxSize={6} />
											<Text>Pendente</Text>
										</Flex>
									)}
									<Button
										variant="solid"
										bg={task.status === "pending" ? "black" : "teal.700"}
										color={task.status === "pending" ? "white" : "yellow.100"}
										onClick={() => handleToggleTask(task.id)}
										maxW="90px"
										size="md">
										{task.status === "pending" ? "Concluir" : "Concluído"}
									</Button>
								</CardFooter>
							</Card>
						))
					)}
				</Flex>
			)}
		</VStack>
	);
};
export default Home;
