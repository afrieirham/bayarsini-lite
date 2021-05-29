import React from 'react'
import Image from 'next/image'
import { Flex, Text } from '@chakra-ui/react'

function Logo({ size, ...props }) {
  return (
    <Flex alignItems='center' {...props}>
      <Image src='/logo.svg' alt='BayarSini logo' width={size} height={size} />
      <Text ml={2} fontWeight='bold'>
        Bayar Sini
      </Text>
    </Flex>
  )
}

export default Logo