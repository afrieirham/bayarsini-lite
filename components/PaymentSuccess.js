import React from 'react'
import { format, parseISO } from 'date-fns'
import { Flex, Heading, Text } from '@chakra-ui/layout'

import DashboardShell from './DashboardShell'

function PaymentSuccess({ receiver, payment }) {
  return (
    <DashboardShell>
      <Flex
        direction='column'
        width='full'
        maxWidth='450px'
        justifyContent='center'
        alignItems='center'
        minHeight='90vh'
      >
        <Flex
          direction='column'
          bg='white'
          px={8}
          py={16}
          border='1px'
          borderColor='gray.200'
          textAlign='center'
          borderRadius='md'
          boxShadow={{ base: 'none', sm: 'lg' }}
        >
          <Text fontSize='sm'>Money sent to</Text>
          <Flex width='full' justifyContent='center'>
            <Text fontWeight='bold' fontSize='lg' mr={2}>
              {receiver.displayName}
            </Text>
          </Flex>
          <Heading color='green.400' my={8}>
            {`RM${payment.amount.toFixed(2)}`}
          </Heading>
          <Text fontSize='sm'>
            Transaction made on{' '}
            <Text as='span' fontWeight='bold'>
              {format(parseISO(payment.paidAt), "d MMM, yyyy 'at' h:mma")}
            </Text>{' '}
            We’ve sent you the receipt to your email.
          </Text>
        </Flex>
      </Flex>
    </DashboardShell>
  )
}

export default PaymentSuccess
