import { Flex, Text } from '@chakra-ui/react'

import DashboardShell from './DashboardShell'
import AddOrderButton from './AddOrderButton'

function EmptyState() {
  return (
    <>
      <Text fontSize='lg' fontWeight='semibold'>
        It's empty in here.
      </Text>
      <Text fontSize='sm' color='gray.600'>
        Start selling by creating your first order.
      </Text>
      <AddOrderButton width='full' size='lg' mt={4}>
        Create Order
      </AddOrderButton>
    </>
  )
}

function MyOrderEmptyState() {
  return (
    <DashboardShell title='My Orders'>
      <Flex
        px={2}
        width='full'
        direction='column'
        justifyContent='center'
        alignItems='center'
        textAlign='center'
        height='90vh'
      >
        <EmptyState />
      </Flex>
    </DashboardShell>
  )
}

export default MyOrderEmptyState
