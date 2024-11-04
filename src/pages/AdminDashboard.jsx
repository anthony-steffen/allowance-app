import { useContext } from "react";
import TaskContext from "../context/taskContext";
import {
	useColorMode,
	Text,
	Flex,
	Heading,
	List,
	ListItem,
	ListIcon,
	Container,
	Button,
} from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import { penalities } from "../shared/penalties";
import BlackList from "../components/blackList";

const AdminDashboard = () => {
	const { sendToApproval, approveTask, rejectTask } = useContext(TaskContext);
	const mode = useColorMode();

	const finalApprove = sendToApproval.some((record) => record.approved);

	console.log(penalities);

	return (
		<Flex p={6} maxW="800px" mx="auto" direction="column">
			<Heading
				as="h1"
				size="lg"
				textAlign="center"
				color={mode.colorMode === "dark" ? "teal.400" : "teal.600"}
        >
				Painel de Administração
			</Heading>

			<Text
				fontSize="xl"
				color={mode.colorMode === "dark" ? "teal.400" : "teal.600"}
				textAlign="center"
        mb={2}
				fontWeight="bold">
				Histórico de Tarefas
			</Text>

			{!finalApprove &&
				sendToApproval.map((task) => (
					<Container
						bg={mode.colorMode === "dark" ? "gray.700" : "gray.100"}
						p={4}
						borderRadius={8}
						boxShadow="md"
						key={task.date}>
						<Text
							fontSize="xl"
							color={mode.colorMode === "dark" ? "teal.400" : "teal.600"}
							textAlign="center"
							fontWeight="bold">
							Tarefas do dia {task.date}
						</Text>
						<Text
							fontSize="md"
							color={mode.colorMode === "dark" ? "teal.400" : "teal.600"}
							textAlign="center"
							fontWeight="bold">
							Valor da recompensa
							{task.dailyReward ? `: R$ ${task.dailyReward.toFixed(2)}` : ": R$ 0,00"}
						</Text>
						<List spacing={1} my={1}>
							{task.completed.map((task) => (
								<ListItem
									key={task.id}
									color={mode.colorMode === "dark" ? "white" : "gray.800"}
									fontWeight="bold"
									fontSize="md">
									<Flex dir="row" align="center" justify="space-between">
										<Text>{task.title}</Text>
										<ListIcon as={CheckCircleIcon} color="green.500" />
									</Flex>
								</ListItem>
							))}
						</List>

						<List spacing={1}>
							{task.notCompleted.map((task) => (
								<ListItem
									key={task.id}
									color={mode.colorMode === "dark" ? "white" : "gray.800"}
									fontWeight="bold"
									fontSize="md">
									<Flex dir="row" align="center" justify="space-between">
										{task.title}
										<ListIcon as={CloseIcon} color="red.400" />
									</Flex>
								</ListItem>
							))}
						</List>

						<Flex
							justify="space-around"
							align="center"
              mt={4}
							flexDir={{ base: "column", md: "row" }}
							gap={2}
              >
							<Button
								maxW="150px"
								onClick={approveTask}
								bg={"teal.700"}
								_hover={{ bg: "teal.800" }}>
								Aprovar Tarefas
							</Button>

							<Button
								maxW="150px"
								onClick={rejectTask}
								bg={"red.500"}
								_hover={{ bg: "red.600" }}>
								Rejeitar Tarefas
							</Button>
						</Flex>
					</Container>
				))}
        {!finalApprove && (
        <BlackList />
      )}
		</Flex>
    
	);
};

export default AdminDashboard;
