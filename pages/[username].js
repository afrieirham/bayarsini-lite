import React from 'react'
import { useForm } from 'react-hook-form'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Flex, Heading, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Avatar } from '@chakra-ui/avatar'

import { getAllUsers, getUserByUsername } from '@utils/db-admin'
import PublicShell from '@components/PublicShell'

export async function getStaticProps(context) {
  const { user } = await getUserByUsername(context.params.username)
  return {
    props: {
      user,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const { users } = await getAllUsers({ isActive: true })

  const paths = users.map((user) => ({
    params: {
      username: user.username,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

function UserPayment({ user }) {
  const { handleSubmit, register } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <PublicShell>
      <Flex direction='column' width='full' maxWidth='450px'>
        <Flex
          px={4}
          py={8}
          width='full'
          maxWidth='450px'
          alignItems='center'
          justifyContent='center'
          direction='column'
        >
          <Avatar src={user?.photoUrl} size='xl' />
          <Heading mt={8} size='lg'>
            {user?.name}
          </Heading>
          <Text>@{user?.username}</Text>
        </Flex>
        <Flex direction='column'>
          <Flex
            direction='column'
            bg='white'
            px={4}
            py={8}
            border='1px'
            borderColor='gray.200'
            as='form'
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <FormLabel fontWeight='bold' fontSize='sm'>
                Amount
              </FormLabel>
              <Input
                placeholder='10.00'
                autoComplete='off'
                name='amount'
                type='number'
                step='.01'
                {...register('amount', { required: true })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontWeight='bold' fontSize='sm'>
                Name
              </FormLabel>
              <Input
                placeholder='Abdullah Ahmad'
                autoComplete='off'
                name='customerName'
                {...register('customerName', { required: true })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontWeight='bold' fontSize='sm'>
                Email
              </FormLabel>
              <Input
                placeholder='abdullah@example.com'
                autoComplete='off'
                name='email'
                type='email'
                {...register('email', { required: true })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontWeight='bold' fontSize='sm'>
                Phone
              </FormLabel>
              <Input
                placeholder='012 123 1234'
                autoComplete='off'
                name='phone'
                type='tel'
                {...register('phone', { required: true })}
              />
            </FormControl>
            <Button
              mt={6}
              size='lg'
              type='submit'
              width='full'
              maxWidth='450px'
              fontSize='sm'
              variant='solid'
              color='white'
              backgroundColor='gray.900'
              _hover={{ bg: 'gray.700' }}
              _focus={{ bg: 'gray.700' }}
              _active={{ bg: 'gray.800' }}
            >
              Pay Now
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </PublicShell>
  )
}

export default UserPayment
