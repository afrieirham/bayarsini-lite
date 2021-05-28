import React from 'react'
import { Flex } from '@chakra-ui/react'

function PublicShell({ children }) {
  return (
    <Flex direction='column'>
      <Flex direction='column' alignItems='center' minHeight='100vh' bg='gray.100'>
        {children}
      </Flex>
    </Flex>
  )
}

export default PublicShell
