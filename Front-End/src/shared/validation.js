export const passwordValidation = {
  required: 'A senha é obrigatória',
  minLength: { value: 8, message: 'A senha deve ter pelo menos 8 caracteres' },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
    message: 'A senha deve conter maiúsculas, minúsculas, números e um caractere especial',
  },
};

export const emailValidation = {
  required: 'O email é obrigatório',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Digite um email válido',
  },
};