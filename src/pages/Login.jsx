import { useForm } from 'react-hook-form'
import { Button, VStack, Container, Heading, Input, FormControl, FormLabel, Text, } from '@chakra-ui/react'
import AuthContext from '../context/authContext';
import { useContext } from 'react';



const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { login } = useContext(AuthContext); 

  const onSubmit = data => {
    login(data);
    reset()
  }

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
        align='center' 
        w={{ base: '80%', md: '50%', xl: '50%' }}
        mx='auto'
      >
        <FormControl mb={1} isRequired isInvalid={errors.email}>
            <FormLabel ms={2} mb={0}>Email</FormLabel>
            <Input
              type="email"
              placeholder="Digite seu email"
              {...register("email")}
            />
            { errors.email && <Text color={'red.400'} size={'sm'}>{errors.email.message}</Text>}
          </FormControl>

        <FormControl imb={1} isRequired isInvalid={errors.Password}>
          <FormLabel ms={2} mb={0}>Password</FormLabel>
          <Input
          placeholder='Password'
          {...register('Password', { minLength: 8})}
          />
          {errors.Password && <Text color={'red.400'} size={'sm'}>{errors.Password.message}</Text>}
        </FormControl>
        <Button type='submit' variant='solid' w='100%' mt={4} fontSize={{ base: 'md', md: 'lg' }}>
          Login
        </Button>
    
      </VStack>
    </Container>
  )
}

export default Login