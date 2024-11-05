import {
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

} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import {useState } from 'react';

const AuthAdminModal = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  console.log(user, password);

  const navigate = useNavigate();

  const handleAdminLogin = (event) => {
   event.preventDefault();
    if (user !== 'admin' || password !== 'admin') {
      alert('Wrong user or password');
      return;
    }
      navigate('/admin');
  };

  return (
    <>
      <Button onClick={onOpen} w={'50%'}>Login Administrador</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>
            Login to AdminDashboard
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl my={4} isRequired>
              <FormLabel mb={1}>User</FormLabel>
              <Input
                mb={1}
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Digite o usuário"
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel mb={1}>Password</FormLabel>
              <Input 
              placeholder='Password'
              onChange={e => setPassword(e.target.value)}
              />
            </FormControl>

          </ModalBody>

          <ModalFooter justifyContent='center'>
            <Button
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