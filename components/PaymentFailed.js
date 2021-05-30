import React, { useState } from 'react'
import { Flex, Heading, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

import DashboardShell from './DashboardShell'

function PaymentFailed({ billCode }) {
  const [loading, setLoading] = useState(false)

  const onClick = () => {
    setLoading(true)

    // Redirect customer to toyyibpayu payment portal
    window.open(`${process.env.NEXT_PUBLIC_TOYYIBPAY_BASE_URL}/${billCode}`, '_parent')
  }

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
          py={8}
          border='1px'
          borderColor='gray.200'
          textAlign='center'
          borderRadius='md'
          boxShadow={{ base: 'none', sm: 'lg' }}
        >
          <Heading size='lg'>Payment Failed</Heading>
          <Text mt={4} fontSize='sm'>
            Something went wrong with your transaction. Please try again using the button below.
          </Text>
          <Button
            mt={8}
            size='lg'
            width='full'
            maxWidth='450px'
            fontSize='sm'
            variant='solid'
            color='white'
            backgroundColor='gray.900'
            _hover={{ bg: 'gray.700' }}
            _focus={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.800' }}
            onClick={onClick}
            isLoading={loading}
          >
            Retry Payment
          </Button>
        </Flex>
      </Flex>
    </DashboardShell>
  )
}

export default PaymentFailed
