import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'

import { useAuth } from '@utils/auth'
import GetMyLinkButton from './GetMyLinkButton'

export default function HomeEmptyState() {
  const { user } = useAuth()

  return (
    <>
      <Box maxWidth='450px' width='full' px={{ base: 4, sm: 0 }} py={8}>
        <Heading size='lg'>Welcome, {user?.name}!</Heading>
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
        <Text fontWeight='bold'>No payments yet.</Text>
        <Text mt={2} fontSize='sm' color='gray.500'>
          You have not receive any money. Share your link to request for payment.
        </Text>
        <GetMyLinkButton />
      </Flex>
    </>
  )
}
