import React from 'react'
import Image from 'next/image'
import { Flex, Text } from '@chakra-ui/react'

function Logo({ size, ...props }) {
  return (
    <Flex as='a' href='/' alignItems='center' {...props}>
      <Image src='/logo.svg' alt='BayarSini logo' width={size} height={size} />
      <Text ml={2} fontWeight='500'>
        BayarSini
      </Text>
    </Flex>
  )
}

export default Logo
