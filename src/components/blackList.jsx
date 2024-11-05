import { useContext } from "react";
import TaskContext from "../context/taskContext";
import { penalities } from "../shared/penalties";
import { useColorMode, Text, Container, Stack, Flex, VStack} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const BlackList = () => {
  const mode = useColorMode();
  const { togglePenalty, selectedPenalties } = useContext(TaskContext);

  return (
    <Container
      bg={mode.colorMode === "dark" ? "gray.700" : "gray.200"}
      p={2}
      my={2}
      borderRadius={8}
      boxShadow="md"
    >
      <Text
        fontSize="xl"
        color={mode.colorMode === "dark" ? "teal.400" : "teal.600"}
        textAlign="center"
        fontWeight="bold"
        mb={2}
      >
        Lista de Penalidades
      </Text>

      <Stack spacing={1} direction="column">
        {penalities.map((penalty) => {
          const isSelected = selectedPenalties.includes(penalty);

          return (
            <Flex 
            key={penalty.id} 
            direction={'row'} 
            justify="space-around" 
            align="center" 
            border={'1px solid'} 
            borderColor={'gray.600'} 
            borderRadius={8} 
            >
              
              <VStack width={'180px'} align="start" p={2}>
              <Text >{penalty.title}</Text>
              </VStack>
              <VStack width={'80px'} align="start" p={2}>
              <Text>{`R$ ${penalty.value}`}</Text>
              </VStack>
              {isSelected ? (
                <DeleteIcon
                  onClick={() => togglePenalty(penalty)}
                  cursor="pointer"
                  color="red.400"
                />
              ) : (
                <AddIcon
                  onClick={() => togglePenalty(penalty)}
                  cursor="pointer"
                  color="green.400"
                />
              )}
            </Flex>
          );
        })}
      </Stack>
    </Container>
  );
};

export default BlackList;
