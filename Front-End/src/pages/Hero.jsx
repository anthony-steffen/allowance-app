import {Box, Heading, Text, VStack, List, ListItem, ListIcon, Flex } from '@chakra-ui/react'
import {CheckCircleIcon} from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <Box maxW="4xl" mx="auto" p={6}>
      <VStack spacing={2} align="start">
        <Flex w="100%" justify="center" mb={4}>
        <Heading as="h1" size="xl" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
          Allowance-App
        </Heading>
        </Flex>
        
        <Text fontSize={{ base: 'md', md: 'xl' }} textAlign={'justify'}>
        O Allowance-App é um aplicativo que incentiva crianças e jovens a realizarem tarefas diárias 
        para ganhar uma mesada baseada nas atividades concluídas, promovendo responsabilidade e organização.
        </Text>

        <Heading as="h2" size="md" mt={2}>
          Funcionalidades principais:
        </Heading>
        <List spacing={1} styleType="none">
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500"/>
            Exibição de uma lista de tarefas diárias com descrição e valor de recompensa.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            Conclusão de tarefas com um botão que marca cada tarefa como realizada e ajusta a recompensa.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            Sistema de autenticação para progresso personalizado do usuário.
          </ListItem>
        </List>

        <Heading as="h2" size="md" mt={2}>
          Tecnologia utilizada:
        </Heading>
        <List spacing={2} styleType="none">
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="purple.500" />
            React com Chakra UI para estilização responsiva e moderna.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="purple.500" />
            Context API para gerenciamento de estado com `AuthContext` e `TaskContext`.
          </ListItem>
        </List>

        <Link to="/login">
          <Text fontSize="lg" color="blue.500" mt={4}>
            Acesse a aplicação clicando 
          </Text>
        </Link>
      </VStack>
    </Box>
  )
}

export default Hero