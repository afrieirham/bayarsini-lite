import React from 'react'
import { format, parseISO } from 'date-fns'
import { Box, Button, Flex, Heading, Spacer, Stack, Text } from '@chakra-ui/react'

import { useAuth } from '@utils/auth'
import DashboardShell from './DashboardShell'
import GetMyLinkButton from './GetMyLinkButton'

function PaymentHistory({ payments, user }) {
  const { signOut } = useAuth()
  return (
    <DashboardShell>
      <Box maxWidth='450px' width='full' px={{ base: 4, sm: 0 }} py={8}>
        <Heading size='lg'>Welcome, {user.name}!</Heading>
      </Box>
      <Flex
        direction='column'
        bg='white'
        p={4}
        borderBottom='1px'
        borderColor='gray.200'
        maxWidth='450px'
        width='full'
        mb={4}
      >
        <Text fontWeight='bold' textAlign='center'>
          Share your link to request money.
        </Text>
        <GetMyLinkButton />
        <Button mt={4} size='sm' variant='ghost' onClick={() => signOut()}>
          Logout
        </Button>
      </Flex>
      <Flex maxWidth='450px' width='full' direction='column' mt={8} pb={16}>
        <Heading size='md' mb={2} px={{ base: 4, sm: 0 }}>
          Payments Received 🥳
        </Heading>
        {payments.map((payment) => (
          <Flex
            bg='white'
            borderBottom='1px'
            borderColor='gray.200'
            p={4}
            fontSize='sm'
            key={payment.id}
          >
            <Stack direction='column' spacing='2'>
              <Text fontSize='xs' color='gray.600'>
                {format(parseISO(payment.paidAt), 'd MMM, yyyy')}
              </Text>
              <Text fontWeight='bold'>{payment.customerName}</Text>
              <Box>
                <Text fontSize='xs'>{`${payment.customerPhone} | ${payment.customerEmail}`}</Text>
              </Box>
            </Stack>
            <Spacer />
            <Flex alignItems='center'>
              <Text fontWeight='bold' color='green.400'>{`${payment.amount.toFixed(2)} MYR`}</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </DashboardShell>
  )
}

export default PaymentHistory
