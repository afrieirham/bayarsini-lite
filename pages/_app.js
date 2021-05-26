import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from '@styles/theme'
import { AuthProvider } from '@utils/auth'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
