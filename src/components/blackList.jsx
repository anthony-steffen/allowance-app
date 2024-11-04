import { useContext } from "react";
import TaskContext from "../context/taskContext";
import { penalities } from "../shared/penalties";
import { useColorMode, Text, Container, Stack, Flex} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const BlackList = () => {
  const mode = useColorMode();
  const { togglePenalty, selectedPenalties } = useContext(TaskContext);

  return (
    <Container
      bg={mode.colorMode === "dark" ? "gray.700" : "gray.100"}
      p={4}
      my={2}
      borderRadius={8}
      boxShadow="md"
    >
      <Text
        fontSize="xl"
        color={mode.colorMode === "dark" ? "teal.400" : "teal.600"}
        textAlign="center"
        fontWeight="bold"
      >
        Lista de Penalidades
      </Text>

      <Stack spacing={1} direction="column">
        {penalities.map((penalty) => {
          const isSelected = selectedPenalties.includes(penalty);

          return (
            <Flex key={penalty.id} justifyContent="space-between" alignItems="center">
              <Text fontWeight="bold" color={mode.colorMode === "dark" ? "white" : "gray.800"}>
                {penalty.title}
              </Text>
              <Text color="teal.600" fontSize="sm" fontWeight="bold" mr={2}>
                {`R$ ${penalty.value.toFixed(2)}`}
              </Text>

              {/* Alterna entre AddIcon e DeleteIcon com base no estado isSelected */}

              {isSelected ? (
                <DeleteIcon color="red.400" onClick={() => togglePenalty(penalty)} />
              ) : (
                <AddIcon color="green.400" onClick={() => togglePenalty(penalty)} />
              )}
            </Flex>
          );
        })}
      </Stack>
    </Container>
  );
};

export default BlackList;
