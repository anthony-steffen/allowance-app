import {useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

// Importando o contexto criado
import AuthContext from './authContext';

// Criando o provedor de autenticação
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  // Carrega o usuário do localStorage, se houver um.
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Função de login para armazenar os dados do usuário
  const login = (credentials) => {
    // Verifica se o usuário existe no localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    //Caso não exista, armazena os dados do usuário
    if (!storedUser) {
      localStorage.setItem('user', JSON.stringify(credentials));
      setUser(credentials);
    }
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
      setUser(JSON.parse(storedUser));
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
