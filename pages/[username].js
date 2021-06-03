import React, { useState } from 'react'
import axios from 'axios'
import { NextSeo } from 'next-seo'
import { useForm } from 'react-hook-form'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Flex, Heading, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/input'
import { Avatar } from '@chakra-ui/avatar'

import { createBill } from '@utils/toyyibpay'
import { trapSpacesForRequiredFields } from '@utils/helper'
import { getAllUsers, getUserByUsername } from '@utils/db-admin'
import * as gtag from '@utils/gtag'
import DashboardShell from '@components/DashboardShell'

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
  const [loading, setLoading] = useState(false)

  if (!user) return 'User not found'

  const { uid, username, name, photoUrl } = user ? user : null

  const onSubmit = async (payment) => {
    setLoading(true)

    const newPayment = {
      receiverId: uid,
      receiverUsername: username,
      amount: Number(payment.amount),
      customerName: payment.customerName,
      customerPhone: payment.customerPhone,
      customerEmail: payment.customerEmail,
      createdAt: new Date().toISOString(),
      status: 2, // 1 = success, 2 = pending, 3 = fail
    }

    // Create payment record
    const { data } = await axios.post('/api/payment', { payment: newPayment })

    // Create toyyibpay bill
    const billCode = await createBill({
      receiver: user,
      payment: {
        ...newPayment,
        id: data.paymentId,
      },
    })

    // Redirect customer to toyyibpayu payment portal
    window.open(`${process.env.NEXT_PUBLIC_TOYYIBPAY_BASE_URL}/${billCode}`, '_parent')

    // Log user click pay now
    gtag.event({
      action: 'customer_pay_now',
      category: 'user',
      label: 'Customer click pay now',
      value: username,
    })

    setLoading(false)
  }

  const title = `${name} (@${username}) | BayarSini`
  const url = `https://bayarsini.link/${username}`

  return (
    <DashboardShell>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          title,
          url,
          images: null,
        }}
      />
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
          <Avatar src={photoUrl} size='xl' />
          <Heading mt={8} size='lg'>
            {name}
          </Heading>
          <Text>@{username}</Text>
        </Flex>
        <Flex direction='column' width='full' alignItems='center'>
          <Flex
            direction='column'
            bg='white'
            px={4}
            py={8}
            border='1px'
            borderColor='gray.200'
            as='form'
            onSubmit={handleSubmit(onSubmit)}
            width='full'
          >
            <FormControl>
              <FormLabel fontWeight='bold' fontSize='sm'>
                Amount
              </FormLabel>
              <InputGroup>
                <InputLeftAddon children='RM' />
                <Input
                  placeholder='Minimum RM1.00'
                  autoComplete='off'
                  name='amount'
                  type='number'
                  step='.01'
                  {...register('amount', {
                    required: true,
                    validate: trapSpacesForRequiredFields,
                  })}
                />
              </InputGroup>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontWeight='bold' fontSize='sm'>
                Name
              </FormLabel>
              <Input
                placeholder='Abdullah Ahmad'
                autoComplete='off'
                name='customerName'
                {...register('customerName', {
                  required: true,
                  validate: trapSpacesForRequiredFields,
                })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontWeight='bold' fontSize='sm'>
                Email
              </FormLabel>
              <Input
                placeholder='abdullah@example.com'
                autoComplete='off'
                name='customerEmail'
                type='email'
                {...register('customerEmail', {
                  required: true,
                  validate: trapSpacesForRequiredFields,
                })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontWeight='bold' fontSize='sm'>
                Phone
              </FormLabel>
              <Input
                placeholder='012 123 1234'
                autoComplete='off'
                name='customerPhone'
                type='tel'
                {...register('customerPhone', {
                  required: true,
                  validate: trapSpacesForRequiredFields,
                })}
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
              isLoading={loading}
            >
              Pay Now
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </DashboardShell>
  )
}

export default UserPayment
