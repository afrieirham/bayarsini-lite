import React from 'react'
import { Flex, Image, Text } from '@chakra-ui/react'

function PublicShell({ children }) {
  return (
    <Flex direction='column'>
      <Flex direction='column' alignItems='center' minHeight='100vh' bg='gray.100'>
        {children}
        <Flex p={8} alignItems='center'>
          <Image src='/logo.svg' height='30px' />
          <Text ml={2} fontWeight='bold'>
            Bayar Sini
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PublicShell
