import React from 'react'
import { Flex } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'

import DashboardShell from './DashboardShell'

function Loader() {
  return (
    <DashboardShell>
      <Flex minHeight='80vh' height='full' alignItems='center'>
        <Spinner size='xl' />
      </Flex>
    </DashboardShell>
  )
}

export default Loader
