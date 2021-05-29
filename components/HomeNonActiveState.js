import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useToast,
} from '@chakra-ui/react'
import { ExternalLink } from 'react-feather'

import { useAuth } from '@utils/auth'
import { updateUserProfile, checkIfUsernameAvailable } from '@utils/db'
import DashboardShell from './DashboardShell'

function HomeNonActiveState() {
  const toast = useToast()

  const { user, setUser } = useAuth()
  const { handleSubmit, register } = useForm()

  const [loading, setLoading] = useState(false)

  const onSubmit = async ({ username, toyyibpay }) => {
    const isAvailable = await checkIfUsernameAvailable(username)

    if (!isAvailable) {
      return toast({
        title: 'Sorry! Username is taken :(',
        description: 'Please choose a different username.',
        status: 'error',
        duration: 4000,
        isClosable: true,
        variant: 'subtle',
        position: 'top',
      })
    }

    // Set loading state
    setLoading(true)

    // Save user data into db
    updateUserProfile(user.uid, { username, toyyibpay, isActive: true })

    setTimeout(() => {
      // Set username in user state
      setUser({ ...user, username })

      // Alert user in UI
      toast({
        title: 'Congratulations! 🎉',
        description: 'You can start receiving money now.',
        status: 'success',
        duration: 6000,
        isClosable: true,
        variant: 'subtle',
        position: 'top',
      })
    }, 1000)
  }

  return (
    <DashboardShell title='Home'>
      <Box maxWidth='450px' width='full' px={{ base: 4, sm: 0 }} py={8}>
        <Heading size='lg'>Welcome, {user?.name}!</Heading>
      </Box>
      <Flex
        direction='column'
        bg='white'
        p={4}
        borderBottom='1px'
        borderColor='gray.200'
        maxWidth='450px'
        width='full'
        mb={4}
      >
        <Text fontSize='sm' color='gray.500'>
          You need to create an account with ToyyibPay to accept payments directly from other users.
        </Text>
        <Text mt={4} fontSize='sm' color='gray.500'>
          Create ToyyibPay account, and come back later to activate your account.
        </Text>
        <Button
          mt={6}
          type='submit'
          maxWidth='450px'
          width='full'
          fontSize='sm'
          variant='solid'
          color='white'
          rightIcon={<ExternalLink size='15' />}
          backgroundColor='gray.900'
          _hover={{ bg: 'gray.700' }}
          _focus={{ bg: 'gray.700' }}
          _active={{ bg: 'gray.800' }}
          onClick={() => window.open('https://toyyibpay.com/e/9168067289423942')}
        >
          Register ToyyibPay
        </Button>
        <Text mt={2} color='gray.400' fontSize='xs' textAlign='center'>
          This is an affiliate link, we will get some commision if you decide to register with this
          link.
        </Text>
      </Flex>
      <Flex maxWidth='450px' width='full' direction='column' mt={8}>
        <Text fontSize='xs' color='gray.500' textTransform='uppercase' px={4} mb={1}>
          Complete Profile
        </Text>
        <Flex
          direction='column'
          bg='white'
          p={4}
          border='1px'
          borderColor='gray.200'
          as='form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl>
            <FormLabel fontSize='sm'>Username</FormLabel>
            <InputGroup>
              <InputLeftAddon children='@' />
              <Input
                placeholder='khairulamingbrand'
                autoComplete='off'
                name='username'
                {...register('username', { required: true })}
              />
            </InputGroup>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel fontSize='sm'>User Secret</FormLabel>
            <Input
              placeholder='xxxxxxxx-xxxx-xxxx-xxxxx-xxxxxxxxxxxx'
              autoComplete='off'
              name='toyyibpay.userSecretKey'
              {...register('toyyibpay.userSecretKey', { required: true })}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel fontSize='sm'>Category Code</FormLabel>
            <Input
              placeholder='xxxxxxxx'
              autoComplete='off'
              name='toyyibpay.categoryCode'
              {...register('toyyibpay.categoryCode', { required: true })}
            />
          </FormControl>
          <Button
            mt={6}
            type='submit'
            maxWidth='450px'
            width='full'
            fontSize='sm'
            variant='solid'
            color='white'
            backgroundColor='gray.900'
            _hover={{ bg: 'gray.700' }}
            _focus={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.800' }}
            isLoading={loading}
          >
            Confirm
          </Button>
        </Flex>
      </Flex>
    </DashboardShell>
  )
}

export default HomeNonActiveState
