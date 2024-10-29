//Imports hook-form
import { useForm } from 'react-hook-form'

//Imports Chakra UI
import { 
  Button, 
  VStack, 
  Container, 
  Heading, 
  Input, 
  FormControl, 
  FormLabel, 
  Text,
  useToast
} from '@chakra-ui/react'

//Imports AuthContext
import AuthContext from '../context/authContext';
import { useContext } from 'react';

//Imports react-router-dom to navigate between pages
import { useNavigate } from 'react-router-dom';

//Import Crypto function to decrypt the user's data
import { decrypt } from '../shared/crypto';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { login } = useContext(AuthContext);

  
  //Instance of useNavigate and useToast to send messages management
  const navigate = useNavigate();
  const toast = useToast();
  
  
  const onSubmit = data => {

    //Get user data from localStorage if it exists
    const findUser = localStorage.getItem('user');
    const users = findUser ? decrypt(findUser) : null;

    if (users && data.email.toLowerCase() === users.email.toLowerCase() && data.password === users.password) {
      login(data);
      reset();
      toast({
        title: 'Seja Bem-Vindo',
        description: 'Você será redirecionado para a página de tarefas',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate('/home');
      }, 5000);
    } else {
      toast({
        title: 'Email ou senha incorretos',
        description: 'Por favor, tente novamente',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    // if (users) {
    //   if (data.email.toLowerCase() === users.email.toLowerCase() && data.password === users.password) {
    //     login(data);
    //     reset();
    //     toast({
    //       title: 'Login efetuado com sucesso',
    //       description: 'Você será redirecionado para a página de Allowance',
    //       status: 'success',
    //       duration: 5000,
    //       isClosable: true,
    //     });
    //     setTimeout(() => {
    //       navigate('/home');
    //     }, 5000);
    //   } else {
    //     toast({
    //       title: 'Email ou senha incorretos',
    //       description: 'Por favor, tente novamente',
    //       status: 'error',
    //       duration: 5000,
    //       isClosable: true,
    //     });
    //   }
    // } else {
    //   toast({
    //     title: 'Usuário não cadastrado',
    //     description: 'Por favor, cadastre-se',
    //     status: 'error',
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // }
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
        </FormControl>

        <Button type='submit' variant='solid' w='100%' mt={4} fontSize={{ base: 'md', md: 'lg' }}>
          Login
        </Button>
    
      </VStack>
    </Container>
  )
}

export default Login