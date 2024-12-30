import { useContext } from "react";
import TaskContext from "../context/taskContext";
import {
	useColorMode,
	Text,
	Stack,
	Flex,
	Card,
	Button,
	VStack,
	Box,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { API } from "../services/api";

const BlackList = () => {
	const { handleLoadPenalties, penalties, setPenalties } = useContext(TaskContext);

	const mode = useColorMode();

	// const handleLoadPenalties = async () => {
	// 	try {
	// 		const response = await API.get("/punishments");
	// 		const penaltiesApi = response.data;
	// 		setPenalties(penaltiesApi);
	// 		localStorage.setItem("penalties", JSON.stringify(penaltiesApi));
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	const togglePenalty = async (penaltyId) => {
		await API.patch(`/punishments/${penaltyId}/toggle`);
		setPenalties((prevPenalties) =>
			prevPenalties.map((penalty) =>
				penalty.id === penaltyId ? { ...penalty, add: !penalty.add } : penalty
			)
		);
	};

	return (
		//Botão para carregar as punições
		<VStack
			p={2}
			width={{ base: "100%" }}
			mx="auto"
			mt={6}
			flexDir={"column"}
			border={mode.colorMode === "dark" ? "2px solid #343e4b" : "2px solid #cbd5e0"}
			rounded={5}>
			{penalties.length > 0 ? (
				<Flex align="center" width={{ base: "100%" }} direction="column">
					<Text
						fontSize="xl"
						fontWeight="bold"
						textAlign={"center"}
						my={2}
						color={"red.400"}>
						Penalidades
					</Text>
					<Stack width={{ base: "100%" }} mx="auto" mt={4}>
						{penalties.map((penalty) => (
							<Card key={penalty.id} p={4} width={{ base: "100%" }}>
								<Flex justify="space-between" align="center">
									<Box width="70%">
									<Text fontSize="md">{penalty.describe}</Text>
									</Box>
									<Box width="15%">
									<Text fontSize="md">{`R$ ${penalty.value.toFixed(2)}`}</Text>
									</Box>
									
									{penalty.add ? (
									<Box width="5%">
										<DeleteIcon
											onClick={() => togglePenalty(penalty.id)}
											color={"red.400"}
										/>
										</Box>
									) : (
										<Box width="5%">
										<AddIcon
											onClick={() => togglePenalty(penalty.id)}
											color={"green.400"}
										/>
										</Box>
									)}
								</Flex>
							</Card>
						))}
					</Stack>
				</Flex>
			) : (
				<Button onClick={handleLoadPenalties}>Carregar Punições</Button>
			)}
		</VStack>
	);
};

export default BlackList;
