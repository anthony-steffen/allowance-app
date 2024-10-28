import { useForm } from 'react-hook-form'
import theme from '../shared/theme';
import {
  Button,
  VStack,
  Container,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'

const Login = () => {

console.log(theme)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (

    <Container maxW='2xl'>
      <Heading 
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'
        fontSize={{ base: '2xl', md: '4xl' }}
        textAlign='center'
        my={10}
      >
        ALLAWANCE-APP
      </Heading>

      <VStack as='form' 
        onSubmit={handleSubmit(onSubmit)}
        // spacing={4} 
        align='center' 
        w={{ base: '80%', md: '50%', xl: '50%' }}
        mx='auto'
      >
        <FormControl isRequired>
          <FormLabel ms={1} mb={0}>E-mail</FormLabel>
          <Input
          placeholder='my-email@exemple.com'
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <Alert status='error'>
          {/* <AlertIcon /> */}
          Email is required and must be valid
          </Alert>}
        </FormControl>

        <FormControl isRequired>
          <FormLabel ms={1} mb={0}>Password</FormLabel>
          <Input
          placeholder='Password'
          {...register('Password', { required: true, minLength: 8})}
          />
          {errors.Password && <Alert status='error'>
         <AlertIcon />
          Password must be longer than 8 characters
          </Alert>}
        </FormControl>

        <Button type='submit' variant='solid' w='100%' mt={4} fontSize={{ base: 'md', md: 'lg' }}>
          Login
        </Button>
    
      </VStack>
    </Container>
  )
}

export default Login