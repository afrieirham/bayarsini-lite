import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

function PublicShell({ title, children }) {
  return (
    <Flex direction='column'>
      <Flex
        as='nav'
        justifyContent='center'
        alignItems='center'
        position='sticky'
        top={0}
        px={2}
        py={4}
        bg='white'
        zIndex='10'
        boxShadow='base'
        width='full'
      >
        <Text fontWeight='bold'>{title}</Text>
      </Flex>
      <Flex direction='column' alignItems='center' minHeight='100vh' bg='gray.100'>
        {children}
      </Flex>
    </Flex>
  )
}

export default PublicShell
