import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { Divider, Flex, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

import { useAuth } from '@utils/auth'
import { GoogleIcon } from '@styles/icons'

export default function Home() {
  const { signInWithGoogle, getRedirectResult } = useAuth()
  const [authLoading, setAuthLoading] = useState(false)

  const signIn = () => {
    setAuthLoading(true)
    signInWithGoogle()
  }

  useEffect(() => {
    getRedirectResult()
  }, [getRedirectResult])

  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
      bg='gray.100'
    >
      <Flex
        mt={4}
        direction='column'
        bg='white'
        py={8}
        px={4}
        maxWidth='350'
        width='90%'
        borderRadius='md'
        boxShadow='lg'
      >
        <Image src='/logo.svg' width={60} height={60} />
        <Text fontSize='xl' fontWeight='bold' textAlign='center' mt={2}>
          BayarSini
        </Text>
        <Divider my={8} />
        <Text textAlign='center' mb={4}>
          Sign in to get started 🚀
        </Text>
        <Button
          onClick={signIn}
          backgroundColor='white'
          color='gray.900'
          variant='outline'
          h='50px'
          _hover={{ bg: 'gray.100' }}
          _active={{ bg: 'gray.100' }}
          leftIcon={<GoogleIcon />}
          size='lg'
          isLoading={authLoading}
        >
          Continue with Google
        </Button>
      </Flex>
    </Flex>
  )
}
