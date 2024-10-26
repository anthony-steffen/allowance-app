import {Box, useColorMode , IconButton,} from '@chakra-ui/react'
import {SunIcon, MoonIcon} from '@chakra-ui/icons'


const ToggleButtonTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode()


  return (
    <Box position='absolute' top={4} right={4}>
      <IconButton
        onClick={toggleColorMode}
        fontSize={'2xl'}
        isRound={true}
        type="button"
        background={'none'}
        border={'none'}
        color = {`${colorMode === 'light' ? '#070c18' : 'yellow.400'}`}
        _hover={'none'}
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      /> 
    </Box>
 
  )
}

export default ToggleButtonTheme