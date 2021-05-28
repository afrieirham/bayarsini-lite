import React from 'react'
import { Box, Button, Flex, Heading, Text, useClipboard } from '@chakra-ui/react'
import { Check, Copy } from 'react-feather'

import { useAuth } from '@utils/auth'
import DashboardShell from './DashboardShell'

const origin = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_VERCEL_URL

export default function HomeEmptyState() {
  const { user } = useAuth()
  const { hasCopied, onCopy } = useClipboard(`${origin}/${user?.username}`)

  return (
    <DashboardShell title='Home'>
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
        {hasCopied ? (
          <Button
            mt={4}
            rightIcon={<Check size='15' />}
            width='full'
            size='lg'
            fontSize='sm'
            variant='solid'
            colorScheme='green'
          >
            Copied
          </Button>
        ) : (
          <Button
            mt={4}
            rightIcon={<Copy size='15' />}
            width='full'
            size='lg'
            fontSize='sm'
            variant='solid'
            color='white'
            backgroundColor='gray.900'
            _hover={{ bg: 'gray.700' }}
            _focus={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.800' }}
            onClick={onCopy}
          >
            Get Payment Link
          </Button>
        )}
      </Flex>
    </DashboardShell>
  )
}
