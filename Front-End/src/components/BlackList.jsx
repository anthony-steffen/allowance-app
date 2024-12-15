import { useContext } from "react";
import TaskContext from "../context/taskContext";
import { useColorMode, Text, Stack, Flex, Card } from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const BlackList = () => {
	const { togglePenalty, penalties } = useContext(TaskContext);
	const mode = useColorMode();

	return (
		<Card
			bg={mode.colorMode === "dark" ? "gray.700" : "white"}
			p={3}
			my={2}
			borderRadius={10}
			border={
				mode.colorMode === "dark" ? "1px solid #343e4b" : "1px solid #cbd5e0"
			}
			boxShadow="md"
			>
			<Text
				fontSize="xl"
				color={mode.colorMode === "dark" ? "red.400" : "red.400"}
				textAlign="center"
				fontWeight="bold"
				mb={2}
				>
				Lista de Penalidades
			</Text>

			<Stack spacing={1} direction="column">
				{penalties.map((penalty) => {
					return (
						<Flex
							key={penalty.id}
							direction={"column"}
							justify="space-between"
							align="center"
							border={"2px solid"}
							borderColor={mode.colorMode === "dark" ? "gray.800" : "gray.300"}
							borderRadius={8}
							gap={2}
							>

								<Text fontSize="md" mt={2} textAlign={'center'}>{penalty.title}</Text>
								<Text>{`R$ ${penalty.value}`}</Text>
	
							{penalty.include ? (
								<DeleteIcon
								onClick={() => togglePenalty(penalty.id)}
								cursor="pointer"
								color="red.400"
								fontSize={'lg'}
                />
              ) : (
								<AddIcon
									onClick={() => togglePenalty(penalty.id)}
									cursor="pointer"
									color="green.400"
									fontSize={'lg'}
								/>
							)}
							<Text as = "button" onClick={() => togglePenalty(penalty.id)}>
								{penalty.include ? "Remover penalidade" : "Adicionar penalidade"}
							</Text>
						</Flex>
					);
				})}
			</Stack>
		</Card>
	);
};

export default BlackList;
