import React from 'react'
import { Flex, Spacer, Stack } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/skeleton'

import DashboardShell from './DashboardShell'

function OrderRowSkeleton() {
  return (
    <Flex bg='white' borderBottom='1px' borderColor='gray.200' p={4} fontSize='sm'>
      <Stack direction='column' spacing='2'>
        <Skeleton width='100px' height='10px' />
        <Skeleton width='200px' height='15px' />
        <Skeleton width='60px' height='10px' />
      </Stack>
      <Spacer />
      <Flex alignItems='center'>
        <Skeleton width='50px' height='15px' />
      </Flex>
    </Flex>
  )
}

function MyOrderSkeleton() {
  return (
    <DashboardShell title='My Orders'>
      <Flex width='full' direction='column'>
        {[...new Array(5)].map((_, i) => (
          <OrderRowSkeleton key={i} />
        ))}
      </Flex>
    </DashboardShell>
  )
}

export default MyOrderSkeleton
