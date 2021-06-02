import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react'
import { ExternalLink } from 'react-feather'

import { useAuth } from '@utils/auth'
import { trapSpacesForRequiredFields } from '@utils/helper'
import { updateUserProfile, checkIfUsernameAvailable } from '@utils/db'
import DashboardShell from './DashboardShell'

function HomeNonActiveState() {
  const toast = useToast()
  const router = useRouter()

  const { user, setUser, signOut } = useAuth()
  const { handleSubmit, register } = useForm()
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()

  const onSubmit = async (data) => {
    const username = data.username.trim()
    const toyyibpay = {
      userSecretKey: data.toyyibpay.userSecretKey.trim(),
      categoryCode: data.toyyibpay.categoryCode.trim(),
    }

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
      setUser({ ...user, username, isActive: true })

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
    <DashboardShell>
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
        <Text mt={4} fontSize='sm' color='gray.500'>
          You can refer our{' '}
          <Link
            as='a'
            color='blue.500'
            href='https://docs.google.com/document/u/4/d/e/2PACX-1vR9i-U_m3ZwtddP-JqSW7UwP7mAAbEY1CmftijRZQpE56R2gMpBMv8SVPkrNOmoc_pIhEYFQZXwEv6W/pub'
            isExternal
          >
            registration guide
          </Link>{' '}
          to setup your account.
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
        <Text
          fontSize='xs'
          color='gray.500'
          textTransform='uppercase'
          px={{ base: 4, sm: 0 }}
          mb={1}
        >
          Complete Profile
        </Text>
        <Flex direction='column' bg='white' p={4} border='1px' borderColor='gray.200' as='form'>
          <FormControl>
            <FormLabel fontSize='sm'>Username</FormLabel>
            <InputGroup>
              <InputLeftAddon children='@' />
              <Input
                placeholder='khairulamingbrand'
                autoComplete='off'
                name='username'
                {...register('username', {
                  required: true,
                  validate: trapSpacesForRequiredFields,
                })}
              />
            </InputGroup>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel fontSize='sm'>ToyyibPay User Secret</FormLabel>
            <Input
              placeholder='xxxxxxxx-xxxx-xxxx-xxxxx-xxxxxxxxxxxx'
              autoComplete='off'
              name='toyyibpay.userSecretKey'
              {...register('toyyibpay.userSecretKey', {
                required: true,
                validate: trapSpacesForRequiredFields,
              })}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel fontSize='sm'>ToyyibPay Category Code</FormLabel>
            <Input
              placeholder='xxxxxxxx'
              autoComplete='off'
              name='toyyibpay.categoryCode'
              {...register('toyyibpay.categoryCode', {
                required: true,
                validate: trapSpacesForRequiredFields,
              })}
            />
          </FormControl>
          <Button
            mt={6}
            onClick={() => setIsOpen(true)}
            maxWidth='450px'
            width='full'
            fontSize='sm'
            variant='solid'
            color='white'
            backgroundColor='gray.900'
            _hover={{ bg: 'gray.700' }}
            _focus={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.800' }}
          >
            Confirm
          </Button>
          <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Confirm Complete Profile
                </AlertDialogHeader>

                <AlertDialogBody>Are you sure? You can't edit this afterwards.</AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    ml={3}
                    type='submit'
                    color='white'
                    variant='solid'
                    backgroundColor='gray.900'
                    _hover={{ bg: 'gray.700' }}
                    _focus={{ bg: 'gray.700' }}
                    _active={{ bg: 'gray.800' }}
                    isLoading={loading}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Confirm
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Flex>
        <Button
          my={4}
          variant='ghost'
          onClick={() => {
            router.push('/')
            signOut()
          }}
        >
          Logout
        </Button>
      </Flex>
    </DashboardShell>
  )
}

export default HomeNonActiveState
