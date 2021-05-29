import React from 'react'
import { Flex } from '@chakra-ui/react'

import Logo from './Logo'

function DashboardShell({ children }) {
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
        width='full'
      >
        <Logo size={30} />
      </Flex>
      <Flex direction='column' alignItems='center' minHeight='100vh' bg='gray.100'>
        {children}
      </Flex>
    </Flex>
  )
}

export default DashboardShell
