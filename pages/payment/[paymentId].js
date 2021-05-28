import React from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { format, parseISO } from 'date-fns'
import { Flex, Heading, Text } from '@chakra-ui/layout'

import fetcher from '@utils/fetcher'
import PublicShell from '@components/PublicShell'
import Logo from '@components/Logo'

function Payment() {
  const router = useRouter()
  const paymentId = router.query.paymentId
  const { data, error } = useSWR(paymentId ? `/api/payment/${paymentId}` : null, fetcher)

  if (!data) {
    return 'Loading...'
  }

  if (error) {
    return error.response?.data?.message || 'error'
  }

  const { payment, receiver } = data

  return (
    <PublicShell>
      <Flex
        direction='column'
        width='full'
        maxWidth='450px'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
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
            {`RM${payment.amount}`}
          </Heading>
          <Text fontSize='sm'>
            Transaction done on{' '}
            <Text as='span' fontWeight='bold'>
              {format(parseISO(payment.paidAt), "d MMM, yyyy 'at' h:mma")}
            </Text>{' '}
            We’ve sent you the receipt to your email.
          </Text>
        </Flex>
        <Logo size={30} p={8} />
      </Flex>
    </PublicShell>
  )
}

export default Payment
