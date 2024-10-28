import { useForm } from 'react-hook-form'

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

const Register = () => {

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

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
          type='password'
          {...register('Password', { required: true, minLength: 8})}
          />
          {errors.Password && <Alert status='error'>
         <AlertIcon />
          Password must be longer than 8 characters
          </Alert>}
        </FormControl>

        <FormControl isRequired>
          <FormLabel ms={1} mb={0}>Confirm Password</FormLabel>
          <Input
            placeholder='Confirm Password'
            type="password"
            {...register('confirmPassword', { 
              required: true, 
              validate: value => value === watch('Password') || 'As senhas não são iguais.'
            })}
          />
          {errors.confirmPassword && <Alert status='error'>
            <AlertIcon />
            {errors.confirmPassword.message}
          </Alert>}
        </FormControl>
        
        <Button type='submit' variant='solid' w='100%' mt={4} fontSize={{ base: 'md', md: 'lg' }}>
          Register
        </Button>
    
      </VStack>
    </Container>
  )
}

export default Register