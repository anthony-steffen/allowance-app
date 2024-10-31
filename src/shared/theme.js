// theme.js

import { extendTheme } from '@chakra-ui/react'


const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,  // Permite ao usuário seguir a configuração do sistema
}

// Definindo cores adaptáveis para os modos light e dark
const colors = {
  // Cores da marca
  brand: {
    light: '#1e2030', // Cinza escuro para o modo escuro
    dark: '#f0e7db', // Bege claro para o modo claro
  },

  // Cores do fundo e texto
  background: {
    light: 'gray.50', // Branco para o modo claro
    dark: 'gray.900', // Cinza escuro para o modo escuro
  },
  text: {
    light: 'gray.900', // Cinza escuro para o modo claro
    dark: 'gray.200', // Bege claro para o modo escuro
  },
  // Cores do botão
  button: {
    bgLight: 'black', // Vermelho para o modo claro
    bgDark: 'black', // preto para o modo escuro
  },
}

// Estilos globais com suporte a adaptação de cores
const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? colors.background.dark : colors.background.light,
      color: props.colorMode === 'dark' ? colors.text.dark : colors.text.light,
      fontFamily: 'body',
      justifyContent: 'center',
    },
  }),
}

// Definindo fontes personalizadas para o heading e body
const fonts = {
  heading: `'Irish Grover', 'Open Sans', 'regular'`,
  body: `'Raleway', 'Open Sans', sans-serif`,
}

// Componentes personalizados, adaptando cores e variações
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: 'lg',
      border: 'none',
      width: '80%',
    },
    variants: {
      solid: (props) => ({
        bg: props.colorMode === 'dark' ? colors.button.bgDark : colors.button.bgLight,
        color: props.colorMode === 'dark' ? colors.text.dark : 'white',
        _hover: {
          bg: props.colorMode === 'dark' ? 
          'teal.700' // Cinza escuro para o modo escuro
          : 
          'teal.600', // Vermelho para o modo claro 
          color: props.colorMode === 'dark' ? colors.text.dark : 'black',
        },
      }),
    },
  },

  Box: {
    baseStyle: {
      maxW: '100%',
    },
  },
  Heading: {
    baseStyle: (props) => ({
      color: props.colorMode === 'dark' ? colors.text.dark : colors.text.light,
    }),
  },
}

// Integração dos estilos e configurações ao tema
const theme = extendTheme({
  config,
  colors,
  styles,
  fonts,
  components,
})

export default theme