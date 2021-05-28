import React from 'react'
import { Button, Flex, Text, useClipboard } from '@chakra-ui/react'
import { Check, Copy } from 'react-feather'

import { useAuth } from 'utils/auth'
import DashboardShell from 'components/DashboardShell'

const origin = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_VERCEL_URL

export default function Home() {
  const { user } = useAuth()
  const { hasCopied, onCopy } = useClipboard(`${origin}/${user?.username}`)

  return (
    <DashboardShell title='Home'>
      <Flex
        px={2}
        width='full'
        direction='column'
        justifyContent='center'
        alignItems='center'
        textAlign='center'
        height='90vh'
      >
        <Text fontSize='lg' fontWeight='semibold'>
          It's empty in here.
        </Text>
        <Text fontSize='sm' color='gray.600'>
          Share your link to request for payment.
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
            Copy Payment Link
          </Button>
        )}
      </Flex>
    </DashboardShell>
  )
}
