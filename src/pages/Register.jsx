import { useForm } from 'react-hook-form'

import {
  Button,
  VStack,
  Container,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Text,
} from '@chakra-ui/react'
import { useContext } from 'react';
import AuthContext from '../context/authContext';

const Register = () => {

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const {login} = useContext(AuthContext);

  const password = watch('password');

  const onSubmit = data => {
    login(data);
    reset();
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
        <FormControl mb={1} isInvalid={errors.name}>
            <FormLabel ms={2} mb={0}>Name</FormLabel>
            <Input
              type="text"
              placeholder="Digite seu nome"
              {...register("name", {
                // required: "O nome é obrigatório",
                minLength: {
                  value: 3,
                  message: "O nome deve ter no mínimo 3 caracteres"
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "O nome deve conter apenas letras"
                }    
              })}        
            />
            { errors.name && <Text color={'red.400'} size={'sm'}>{errors.name.message}</Text>}
        </FormControl>

        <FormControl mb={1} isInvalid={errors.email}>
            <FormLabel ms={2} mb={0}>Email</FormLabel>
            <Input
              type="email"
              placeholder="Digite seu email"
              {...register("email", {
              required: "O email é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "email inválido"
              }
            })}
            />
            { errors.email && <Text color={'red.400'} size={'sm'}>{errors.email.message}</Text>}
          </FormControl>

        <FormControl mb={1} isInvalid={errors.password}>
          <FormLabel ms={2} mb={0}>Password</FormLabel>
          <Input
          placeholder='Password'
          {...register('password', { 
            required: 'A senha é obrigatória',
            minLength: { value: 8, message: "A senha deve ter pelo menos 8 caracteres" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "A senha deve conter letras maiúsculas, minúsculas, números e um caractere especial"
              }
          })}
          />
          {errors.password && <Text color={'red.400'} size={'sm'}>{errors.password.message}</Text>}
        </FormControl>

        <FormControl imb={1} isInvalid={errors.confirmPassword}>
          <FormLabel ms={2} mb={0}>Confirm Password</FormLabel>
          <Input
          placeholder='Confirm Password'
          {...register('confirmPassword', {
            required: 'Confirme a senha',
            validate: value => value === password || 'As senhas não correspondem'
          })}
          />
          {errors.confirmPassword && <Text color={'red.400'} size={'sm'}>{errors.confirmPassword.message}</Text>}
        </FormControl>
        
        <Button type='submit' variant='solid' w='100%' mt={4} fontSize={{ base: 'md', md: 'lg' }}>
          Register
        </Button>
    
      </VStack>
    </Container>
  )
}

export default Register