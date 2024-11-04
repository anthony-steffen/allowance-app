import { Text, Stack, Checkbox,Container, useColorMode } from '@chakra-ui/react'
import { penalities } from '../shared/penalties'



const BlackList = () => {
  const mode = useColorMode();
  return (
    <Container bg={mode.colorMode === "dark" ? "gray.700" : "gray.100"} p={4} my={2} borderRadius={8} boxShadow="md">
          <Text 
          fontSize="xl" 
          color={mode.colorMode === "dark" ? "teal.400" : "teal.600"} 
          textAlign="center" 
          fontWeight="bold">
            Lista de Penalidades
          </Text>

          <Stack spacing={1} direction='column'>
            {penalities.map(penalty => (
              <Checkbox key={penalty.id} value={penalty.title} colorScheme="teal" defaultChecked={penalty.add} onChange={() => penalty.add = !penalty.add}>
                {penalty.title}
              </Checkbox>

            ))}
          </Stack>
        </Container> 
  )
}

export default BlackList