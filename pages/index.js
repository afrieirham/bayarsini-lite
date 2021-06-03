import React from 'react'
import NextLink from 'next/link'
import { Flex, Text, Heading, Button, Box, Link, Image, useBreakpointValue } from '@chakra-ui/react'

import { FAQ, FeedbackLink, RegistrationGuide } from '@constants/Links'
import * as gtag from '@utils/gtag'
import Logo from '@components/Logo'

export default function Home() {
  const heading1Size = useBreakpointValue({ base: 'xl', lg: '2xl' })
  const heading2Size = useBreakpointValue({ base: 'sm', md: 'md' })
  const heroImage = useBreakpointValue({
    base: '/screenshot.png',
    md: '/screenshot-with-shapes.png',
  })

  return (
    <Flex flexDirection='column' justifyContent='center' alignItems='center'>
      <Flex
        as='header'
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
            <NextLink href='/login' passHref>
              <Button
                variant='solid'
                fontSize='sm'
                variant='solid'
                color='white'
                backgroundColor='gray.900'
                _hover={{ bg: 'gray.700' }}
                _focus={{ bg: 'gray.700' }}
                _active={{ bg: 'gray.800' }}
                onClick={() => {
                  gtag.event({
                    action: 'user_click_login',
                    category: 'user_acquisition',
                    label: 'User acquisition',
                    value: 'login_button',
                  })
                }}
              >
                Login
              </Button>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        width='full'
        justifyContent='center'
        minHeight='85vh'
        bg='blackAlpha.50'
        px={{ base: 4, sm: 8 }}
      >
        <Flex
          width='full'
          maxWidth='1250px'
          direction={{ base: 'column', lg: 'row' }}
          justifyContent='center'
          alignItems='center'
          textAlign={{ base: 'center', lg: 'left' }}
        >
          <Flex
            width={{ base: 'full', lg: '50%' }}
            flexDirection='column'
            justifyContent='center'
            py={{ base: 8, lg: 0 }}
          >
            <Heading size={heading1Size}>Get paid with a link – effortlessly.</Heading>
            <Heading
              mt={{ base: 2, lg: 2 }}
              size={heading2Size}
              fontWeight='regular'
              color='gray.600'
            >
              Pick a username. Share your link. Get paid!
            </Heading>
            <Flex alignItems='center' mt={8} justifyContent={{ base: 'center', lg: 'flex-start' }}>
              <NextLink href='/login' passHref>
                <Button
                  variant='solid'
                  size='lg'
                  fontSize='sm'
                  variant='solid'
                  color='white'
                  px={8}
                  backgroundColor='gray.900'
                  _hover={{ bg: 'gray.700' }}
                  _focus={{ bg: 'gray.700' }}
                  _active={{ bg: 'gray.800' }}
                  onClick={() => {
                    gtag.event({
                      action: 'user_click_login',
                      category: 'user_acquisition',
                      label: 'User acquisition',
                      value: 'try_now_button',
                    })
                  }}
                >
                  Try Now
                </Button>
              </NextLink>
              <Text ml={4} color='gray.700'>
                – Psst, it's free!
              </Text>
            </Flex>
          </Flex>
          <Flex
            py={{ base: 0, lg: 16 }}
            width={{ base: 'full', lg: '50%' }}
            justifyContent='center'
            alignItems='center'
          >
            <Image src={heroImage} maxHeight='650px' />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        as='footer'
        width='full'
        justifyContent='center'
        backgroundColor='gray.800'
        py={8}
        bottom={0}
        position={{ base: 'static', xl: 'absolute' }}
      >
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
              <Link
                href='mailto:afrieirham@outlook.com'
                onClick={() => {
                  gtag.event({
                    action: 'user_click_contact',
                    category: 'external_link',
                    label: 'Contact clicked',
                    value: 'contact',
                  })
                }}
              >
                Contact
              </Link>
              <Box as='span' mx={1}>
                &middot;
              </Box>
              <Link
                href={FeedbackLink}
                isExternal
                onClick={() => {
                  gtag.event({
                    action: 'user_click_feedback',
                    category: 'external_link',
                    label: 'Feedback form clicked',
                    value: 'feedback_form',
                  })
                }}
              >
                Feedback
              </Link>
              <Box as='span' mx={1}>
                &middot;
              </Box>
              <Link
                href={RegistrationGuide}
                isExternal
                onClick={() => {
                  gtag.event({
                    action: 'user_click_guide',
                    category: 'external_link',
                    label: 'Registration guide clicked',
                    value: 'registration_guide',
                  })
                }}
              >
                Guide
              </Link>
              <Box as='span' mx={1}>
                &middot;
              </Box>
              <Link
                href={FAQ}
                isExternal
                onClick={() => {
                  gtag.event({
                    action: 'user_click_FAQ',
                    category: 'external_link',
                    label: 'FAQ clicked',
                    value: 'faq',
                  })
                }}
              >
                FAQs
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
