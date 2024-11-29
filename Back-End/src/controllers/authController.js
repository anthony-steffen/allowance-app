const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Registrar novo usuário
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar se o email já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o usuário
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar usuário', message: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o email existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'email não cadastrado' });
    }

    // Verificar a senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    // Gerar token JWT com o type e id do usuário
    const token = jwt.sign({ id: user.id, type: user.type }, JWT_SECRET, {
      expiresIn: '2h',
    });
    res.status(200).json({ message: 'Login realizado com sucesso', token });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
}

module.exports = { registerUser, loginUser };
