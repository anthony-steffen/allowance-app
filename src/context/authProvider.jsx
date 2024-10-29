import {useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

// Importando o contexto criado
import AuthContext from './authContext';

// Criando o provedor de autenticação
const { Provider } = AuthContext;

// import Crypto to encrypt the user's data
import { encrypt, decrypt } from '../shared/crypto';

const AuthProvider = ({ children }) => {
  // Carrega o usuário do localStorage, se houver um.
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? encrypt(JSON.parse(storedUser)) : null;
  });

  // Função de login para armazenar os dados do usuário
  const login = (data) => {
    setUser(data);
    localStorage.setItem('user', encrypt(data));
  }
  
  // Função de logout para remover os dados do usuário
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
  const store = useMemo(() => ({ user, setUser, login, logout }), [user]);

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
