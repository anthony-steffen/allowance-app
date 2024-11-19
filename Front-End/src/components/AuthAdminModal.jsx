import {
  useColorMode,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';

import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'

import { useNavigate } from 'react-router-dom';
import {useState } from 'react';

const AuthAdminModal = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();
  const colorMode = useColorMode();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);


  const handleAdminLogin = (event) => {
   event.preventDefault();
    if (user !== 'admin' || password !== 'admin') {
      alert('Wrong user or password');
      return;
    }
      navigate('/admin');
  };

  const handleClick = () => setShow(!show);

  return (
    <>
      <Button
      type='button'
      onClick={onOpen} 
      w={'60%'}
      >Login Administrador</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
        w={{ base: '90%', md: '50%' }}
        color={ colorMode.colorMode === 'dark' ? 'white' : 'white' }
        bg={ colorMode.colorMode === 'dark' ? 'gray.800' : 'gray.800'        
        }
        >
          <ModalHeader textAlign='center'>
            Login to AdminDashboard
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl my={4} isRequired>
              <FormLabel mb={1}>User</FormLabel>
              <Input
                variant='flushed'
                mb={1}
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Digite o usuário"
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel mb={1}>Password</FormLabel>
              <InputGroup size='md'>
              <Input
              variant='flushed'
              type={show ? 'text' : 'password'}
              placeholder='Digite sua Senha'
              onChange={e => setPassword(e.target.value)}
              />
              <InputRightElement width='4.5rem'>
                {show ? 
                <ViewOffIcon h={5} w={5} onClick={handleClick}/> 
                : 
                <ViewIcon h={5} w={5} onClick={handleClick} />}
              </InputRightElement>
              </InputGroup>
            </FormControl>

          </ModalBody>

          <ModalFooter justifyContent='center'>
            <Button
            type='button'
            mb={4}
            w={'50%'}
            onClick={handleAdminLogin}
            >
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AuthAdminModal