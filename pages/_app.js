import { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'

import SEO from 'next-seo.config'
import { pageView } from '@utils/gtag'
import { AuthProvider } from '@utils/auth'
import { customTheme } from '@styles/theme'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageView(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router, router.events])

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
