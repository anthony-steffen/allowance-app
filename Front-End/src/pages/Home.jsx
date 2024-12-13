import { useContext, useState} from "react";
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
import {API} from "../services/api";

const Home = () => {
	const {
		tasks,
		setTasks,
		sendToApproval,
		setSendToApproval,
		tasksLoadedToday,
		setTasksLoadedToday,
		handleToggleTask,
		handleCompleteAllTasks,
	} = useContext(TaskContext);

	const today = new Date().toLocaleDateString("pt-BR");
	const toast = useToast();
	const { colorMode } = useColorMode();
	const [loading, setLoading] = useState(false);

	const completedTasks = tasks.filter((task) => task.status === "completed");
	const totalValue = completedTasks
		.reduce((acc, task) => acc + task.value, 0)
		.toFixed(2);
	const allTasksCompleted = tasks.every((task) => task.status === "completed");
	const progress =
		tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

	const handleLoadTasks = async () => {
		try {
			setLoading(true);
			const response = await API.get("/tasks");
			const apiTasks = response.data;
			setTasks(apiTasks);
			localStorage.setItem("tasks", JSON.stringify(apiTasks));
			setTasksLoadedToday(today);
		} catch (error) {
			toast({
				title: "Erro ao carregar tarefas.",
				description: error.message,
				status: "error",
				duration: 3000,
			});
		} finally {
			setLoading(false);
		}
	};

	const handleApprovalRequest = () => {
		setSendToApproval(tasks);
		setTasks([]);
		// Salva a data de aprovação no localStorage
		localStorage.setItem("approvalDate", today);
		toast({
				title: "Solicitação enviada para aprovação.",
				status: "success",
				duration: 3000,
				position: "mid",
		});
};

const hasApprovalDateExpired = () => {
	const storedApprovalDate = localStorage.getItem("approvalDate");
	return storedApprovalDate && storedApprovalDate !== today;
};

// Reseta o estado quando a data expira
if (hasApprovalDateExpired()) {
	setSendToApproval(false);
	localStorage.removeItem("approvalDate");
}

	return (
		<VStack
			p={2}
			width={{ base: "100%" }}
			mx="auto"
			flexDir={"column"}
		>
			{/* Renderização Condicional: Mensagem de agradecimento ou Dashboard */}
			{sendToApproval ? (
				<Flex 
				w={"100%"}
				h={'98vh'}
				flexDir={"column"}
				justify={"center"}
				alignItems={"center"}
				border={colorMode === "dark" ? "1px solid #343e4b" : "1px solid #cbd5e0"}
				>
					<Heading as="h1" size="lg" textAlign="center" mt={10} p={2} color={"teal.700"}>
						Obrigado por completar suas tarefas! <br />
						Volte amanhã para mais recompensas.
					</Heading>
				</Flex>
			) : (
				<Flex 
				flexDir={"column"} 
				width={{ base: "100%", md: "100%", lg: "70%" }} 
				mx="auto" 
				mt={8}
				>
					<Heading as="h1" size="lg" mb={4} textAlign="center">
						Minhas Tarefas Diárias
					</Heading>
					<Heading as="h1" size="lg" mb={4} textAlign="center">
						Mesada R$ {totalValue}
					</Heading>


					{/* Renderização Condicional: Botão de carregar tarefas */}
					{!tasksLoadedToday &&(
						<Flex justifyContent="center">
							<Button
								maxW={"200px"}
								onClick={handleLoadTasks}
								isLoading={loading}
								loadingText="Carregando..."
								colorScheme="teal"
								mb={4}
							>
								Carregar Tarefas Diárias
							</Button>
						</Flex>
					)}
							<Flex
								width={{ base: "100%", md: "60%" }}
								mx="auto"
								bg={colorMode === "dark" ? "none" : "gray.200"}
								p={4}
								borderRadius={10}
								border={colorMode === "dark" ? "1px solid #343e4b" : "1px solid #cbd5e0"}
								boxShadow="md"
								alignItems="center"
								mb={4}
								direction={{ base: "column", md: "row" }}
								gap={4}
							>
								<CircularProgress
									value={progress}
									color={progress <= 30 ? "red.500" : progress <= 60 ? "yellow.500" : "green.500"}
									size={{ base: "50px", md: "60px" }}

								>
									<CircularProgressLabel>{progress ? `${progress.toFixed(0)}%` : "0%"}</CircularProgressLabel>
								</CircularProgress>
								<Text ml={4} align={"center"}>
									{completedTasks.length} de {tasks.length} tarefas concluídas
								</Text>
				
								
							
								<Button
									maxW="170px"
									bg={allTasksCompleted ? "teal.700" : "black"}
									color={allTasksCompleted ? "yellow.100" : "white"}
									m={"auto"}
									onClick={handleCompleteAllTasks}
									disabled={allTasksCompleted}>
									{allTasksCompleted ? "Concluídas" : "Concluir Todas"}
								</Button>
							</Flex>
							<Flex justifyContent="center" mb={4}>
								<Button disabled={tasks.length === 0} onClick={handleApprovalRequest} maxW="170px">
									Solicitar Aprovação
								</Button>
							</Flex>
				
							{loading ? (
								<Text textAlign="center">Carregando tarefas...</Text>
							) : (
								tasks.map((task) => (
									<Card
										key={task.id}
										width={{ base: "100%", md: "60%" }}
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
												color={
													task.status === "pending" ? "white" : "yellow.100"
												}
												onClick={() => handleToggleTask(task.id)}
												maxW="90px"
												size="md">
												{task.status === "pending" ? "Concluir" : "Concluído"}
											</Button>
										</CardFooter>
									</Card>
								)
							))}
				</Flex>
			)}
		</VStack>
	);
};
export default Home;
