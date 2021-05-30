import React from 'react'
import NextLink from 'next/link'
import { Flex, Text, Heading, Button, Box, Link, Image } from '@chakra-ui/react'

import Logo from '@components/Logo'

function Landing() {
  return (
    <Flex flexDirection='column' justifyContent='center' alignItems='center'>
      <Flex
        width='full'
        alignItems='stretch'
        justifyContent='center'
        backgroundColor='whiteAlpha.500'
        boxShadow='md'
        p={4}
      >
        <Flex width='full' maxWidth='1250px' justifyContent='space-between'>
          <Flex>
            <Logo size={50} />
          </Flex>
          <Flex alignItems='center'>
            <NextLink href='/' passHref>
              <Button
                variant='solid'
                fontSize='sm'
                variant='solid'
                color='white'
                backgroundColor='gray.900'
                _hover={{ bg: 'gray.700' }}
                _focus={{ bg: 'gray.700' }}
                _active={{ bg: 'gray.800' }}
              >
                Login
              </Button>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
      <Flex width='full' justifyContent='center' height='76.3vh' bg='blackAlpha.50'>
        <Flex width='full' maxWidth='1250px'>
          <Flex width='50%' flexDirection='column' justifyContent='center'>
            <Heading size='2xl'>Get paid with a link – effortlessly.</Heading>
            <Heading mt={4} size='md' fontWeight='regular' color='gray.600'>
              Pick a username. Share your link. Get paid!
            </Heading>
            <Flex alignItems='center' mt={8}>
              <NextLink href='/' passHref>
                <Button
                  variant='solid'
                  size='lg'
                  fontSize='sm'
                  variant='solid'
                  color='white'
                  backgroundColor='gray.900'
                  _hover={{ bg: 'gray.700' }}
                  _focus={{ bg: 'gray.700' }}
                  _active={{ bg: 'gray.800' }}
                >
                  Try Now
                </Button>
              </NextLink>
              <Text ml={4} color='gray.700'>
                – Psst, it's free!
              </Text>
            </Flex>
          </Flex>
          <Flex width='50%' py={16} justifyContent='center'>
            <Image src='/screenshot-with-shapes.png' />
          </Flex>
        </Flex>
      </Flex>
      <Flex width='full' justifyContent='center' backgroundColor='gray.800' height='15vh'>
        <Flex
          width='full'
          maxWidth='1250px'
          flexDirection='row'
          justifyContent='center'
          alignItems='center'
        >
          <Flex
            flexDirection='column'
            color='white'
            fontSize='sm'
            color='gray.400'
            alignItems='center'
          >
            <Text>&copy; BayarSini 2021. All Rights Reserved.</Text>
            <Flex mt={1}>
              <Link>Contact</Link>
              <Box as='span' mx={1}>
                &middot;
              </Box>
              <Link>Feedback</Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Landing
