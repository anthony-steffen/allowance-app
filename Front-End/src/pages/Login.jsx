import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  VStack,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Text,
  useToast,
  Box,
  Flex,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';
// import { passwordValidation } from '../shared/validation';
import api from '../services/api';


const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { login } = useContext(AuthContext);
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  //Instance of useNavigate and useToast to send messages management
  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = () => setShow(!show);
  
  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email: data.email.toLowerCase(),
        password: data.password,
      });

      const { user, token } = response.data;
      login({ user, token });

      toast({
        title: 'Login realizado com sucesso!',
        description: 'Redirecionando para a página inicial.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      console.log(response.data);

      reset();
      setTimeout(() => navigate('/home'), 1000);
    } catch (error) {
      toast({
        title: 'Erro no login',
        description: 'Verifique suas credenciais e tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex maxW='2xl' mx='auto' direction='column' align='center' >
      <Heading 
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'
        fontSize={{ base: '2xl', md: '4xl' }}
        textAlign='center'
        my={10}
      >
        ALLOWANCE
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
          <InputGroup size='md'>
          <Input
          type={show ? 'text' : 'password'}
          placeholder='Password'
          {...register('password', { 
            required: 'A senha é obrigatória',
            minLength: { value: 8, message: "A senha deve ter pelo menos 8 caracteres" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_]+)[A-Za-z\d@$!%*?&_]{8,}$/,
           
                message: "A senha deve conter letras maiúsculas, minúsculas, números e pelo menos um caractere especial"
              }
          })}
          />
          {errors.password && <Text color={'red.400'} size={'sm'}>{errors.password.message}</Text>}
          <InputRightElement width='4.5rem'>
            {show ? 
            <ViewOffIcon h={5} w={5} onClick={handleClick}/> 
            : 
            <ViewIcon h={5} w={5} onClick={handleClick} />}
          </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button 
        type='submit' 
        variant='solid' 
        w='100%' 
        mt={4} 
        fontSize={{ base: 'md', md: 'lg' }}
        isLoading={isLoading}
        >
          Login
        </Button>
        <Box>
          <Text align={'center'} fontSize={'sm'} mt={2}>
            Não tem uma conta?
          </Text>
          <Link to='/register'>
            <Text align={'center'} fontSize={'sm'}mt={1}>Registre-se</Text>
          </Link>
        </Box>
    
      </VStack>
    </Flex>
  )
}

export default Login