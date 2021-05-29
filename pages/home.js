import React from 'react'
import useSWR from 'swr'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import { Flex } from '@chakra-ui/layout'

import { useAuth } from '@utils/auth'
import fetcher from '@utils/fetcher'
import DashboardShell from '@components/DashboardShell'
import HomeNonActiveState from '@components/HomeNonActiveState'
import HomeEmptyState from '@components/HomeEmptyState'
import PaymentHistory from '@components/PaymentHistory'
import Loader from '@components/Loader'

export default function Home() {
  const { user, authLoading } = useAuth()
  const { data, error } = useSWR(user ? ['/api/payments', user.token] : null, fetcher)

  if (!user && !authLoading) {
    return 'No logged in user'
  }

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
          <Tab textTransform='' fontSize='sm'>
            Home
          </Tab>
          <Tab textTransform='' fontSize='sm'>
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
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardShell>
  )
}
