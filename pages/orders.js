import React from 'react'
import useSWR from 'swr'
import { Flex, Text } from '@chakra-ui/react'
import { Plus } from 'react-feather'

import { useAuth } from '@utils/auth'
import fetcher from '@utils/fetcher'
import DashboardShell from '@components/DashboardShell'
import OrderRow from '@components/OrderRow'
import AddOrderButton from '@components/AddOrderButton'
import MyOrderEmptyState from '@components/MyOrderEmptyState'
import MyOrderSkeleton from '@components/MyOrderSkeleton'

export default function Orders() {
  const { user } = useAuth()
  const { data } = useSWR(user ? ['/api/orders', user.token] : null, fetcher)

  if (!data) return <MyOrderSkeleton />
  if (!data.orders.length) return <MyOrderEmptyState />

  return (
    <DashboardShell title='My Orders'>
      <Flex width='full' direction='column' mb={16}>
        <Flex
          width='full'
          p={4}
          justifyContent='flex-end'
          position='fixed'
          bottom='0'
          zIndex='sticky'
        >
          <AddOrderButton borderRadius='50px' leftIcon={<Plus size='15' />}>
            New Order
          </AddOrderButton>
        </Flex>

        {data.orders.map((order) => (
          <OrderRow key={order.id} {...order} />
        ))}
        <Flex p={4} width='full' justifyContent='center'>
          <Text color='gray.500' fontSize='sm'>
            No more orders
          </Text>
        </Flex>
      </Flex>
    </DashboardShell>
  )
}
