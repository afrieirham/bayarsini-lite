import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from '@styles/theme'
import { AuthProvider } from '@utils/auth'
import { DefaultSeo } from 'next-seo'

import SEO from 'next-seo.config'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
