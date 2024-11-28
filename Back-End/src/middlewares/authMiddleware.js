const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Espera o token no formato: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
     // Atribui o ID do usuário ao req.user
     req.user = { userId: decoded.id };
     next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado.", error: error.message });
  }
};

module.exports = authenticate;
