import React, { useEffect } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import { Flex, Heading, Link } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

import { useAuth } from '@utils/auth'
import fetcher from '@utils/fetcher'
import DashboardShell from '@components/DashboardShell'
import HomeNonActiveState from '@components/HomeNonActiveState'
import HomeEmptyState from '@components/HomeEmptyState'
import PaymentHistory from '@components/PaymentHistory'
import Loader from '@components/Loader'

export default function Home() {
  const router = useRouter()
  const { user, authLoading, signOut } = useAuth()
  const { data, error } = useSWR(user ? ['/api/payments', user.token] : null, fetcher)

  useEffect(() => {
    if (!user && !authLoading) {
      router.push('/')
    }
  }, [user, authLoading, router])

  if (error) {
    return 'error'
  }

  if (!data) {
    return <Loader />
  }

  if (!user.isActive) {
    return <HomeNonActiveState />
  }

  const hasPaymentHistory = data.payments.length

  return (
    <DashboardShell>
      <Tabs width='full' colorScheme='gray.900' variant='line' p={0} isFitted={false} isLazy>
        <TabList bg='white' as={Flex} justifyContent='center'>
          <Tab fontWeight='bold' fontSize='sm'>
            Home
          </Tab>
          <Tab fontWeight='bold' fontSize='sm'>
            Settings
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0} as={Flex} direction='column' alignItems='center'>
            {hasPaymentHistory ? (
              <PaymentHistory payments={data.payments} user={user} />
            ) : (
              <HomeEmptyState />
            )}
          </TabPanel>
          <TabPanel p={0} as={Flex} direction='column' alignItems='center'>
            <Flex direction='column' width='full' maxWidth='450px' pt={8}>
              <Heading size='md'>Links</Heading>
              <Link
                mt={4}
                color='blue.500'
                href='https://docs.google.com/document/u/4/d/e/2PACX-1vRZAZQJxjeotII-Adr485wnUu8192ra7gsFYkb6YW3hTdTQw76hDuTMumUaVnUjIDjBaS1yOlCH1cX4/pub'
                isExternal
              >
                FAQs
              </Link>

              <Button
                mt={4}
                size='sm'
                onClick={() => {
                  router.push('/')
                  signOut()
                }}
                variant='ghost'
              >
                Logout
              </Button>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardShell>
  )
}
