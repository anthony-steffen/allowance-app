import {useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import AuthContext from './authContext';
import { encrypt, decrypt } from '../shared/crypto';
import axios from 'axios';

// Criando o provedor de autenticação
const { Provider } = AuthContext;


const AuthProvider = ({ children }) => {

  // Estado para armazenar o usuário autenticado
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return decrypt(storedUser); // Tente descriptografar o usuário
      } catch (error) {
        console.error('Erro ao descriptografar os dados do usuário:', error);
        localStorage.removeItem('user'); // Remove o dado inválido
        return null; // Retorne null se houver um erro
      }
    }
    return null; // Retorne null se não houver usuário armazenado
  });

  // Função para registrar usuário
  const registerUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', userData);
      setUser(response.data.user); // Opcional: atualizar o estado do usuário após registro
      return { success: true, message: "Usuário cadastrado com sucesso" };
    } catch (error) {
      return { success: false, message: error.response.data.message || "Erro no registro" };
    }
  };


  const login = (data) => {
    setUser(data);
    localStorage.setItem('user', encrypt(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Efeito para restaurar o estado do usuário ao carregar a aplicação
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const decryptedUser = decrypt(storedUser);
      setUser(decryptedUser); // Atualiza o estado do usuário com dados criptografados
    } catch (error) {
      console.error('Erro ao descriptografar os dados do usuário:', error);
      localStorage.removeItem('user'); // Remove o dado inválido para evitar futuros erros
    }
  }
}, []);

  // useMemo para memoizar o valor do contexto, evitando recriações desnecessárias
  const store = useMemo(() => ({ user, setUser, registerUser, login, logout }), [user]);

  return (
    <Provider value={store}>
      {children}
    </Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
