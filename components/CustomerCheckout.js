import React, { useState } from 'react'
import store from 'store'
import { useForm } from 'react-hook-form'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Select } from '@chakra-ui/select'
import { Flex, Heading, Text } from '@chakra-ui/layout'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control'

import { updateOrder } from '@utils/db'
import { createBill } from '@utils/toyyibpay'
import { states } from '@constants/MalaysiaStates'
import OrderDetailsCard from './OrderDetailsCard'

function CustomerCheckout({ order }) {
  const customer = store.get('customer')
  const [loading, setLoading] = useState(false)
  const { handleSubmit, register, reset, errors } = useForm({ defaultValues: { ...customer } })

  const onSubmit = async (customer) => {
    setLoading(true)

    // Save customer info to localStorage and db
    store.set('customer', customer)
    updateOrder(order.id, customer)

    // Request for billCode to ToyyibPay
    const billCode = await createBill({ customer, order })

    // Redirect customer to toyyibpayu payment portal
    window.open(`${process.env.NEXT_PUBLIC_TOYYIBPAY_BASE_URL}/${billCode}`, '_parent')
  }

  const clearForm = () => {
    store.remove('customer')
    reset({})
  }

  const isPaid = order.status === 'paid'

  return (
    <Flex direction='column' width='full'>
      <Flex px={4} py={8}>
        <Heading size='sm'>{isPaid ? 'Order recieved! 🎉' : 'Thank you for your order!'}</Heading>
      </Flex>

      <OrderDetailsCard {...order} />

      {!isPaid && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text fontSize='xs' color='gray.500' textTransform='uppercase' px={4} mb={1} mt={8}>
            Customer
          </Text>
          <Flex bg='white' p={4} borderY='1px' borderColor='gray.200'>
            <Flex direction='column' width='full'>
              {/* Contact form */}
              <Flex justifyContent='space-between' alignItems='center'>
                <Heading size='md' fontWeight='bold'>
                  Contact
                </Heading>
                {customer && (
                  <Button variant='ghost' size='sm' fontSize='sm' onClick={clearForm}>
                    Clear
                  </Button>
                )}
              </Flex>
              <FormControl id='phone' mt={4} isInvalid={errors?.contact?.phone} isRequired>
                <FormLabel fontSize='sm'>Phone</FormLabel>
                <Input
                  type='tel'
                  name='contact.phone'
                  {...register('contact.phone', { required: 'Phone is required' })}
                />
                <FormErrorMessage>{errors?.contact?.phone?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id='email' mt={4} isInvalid={errors?.contact?.email} isRequired>
                <FormLabel fontSize='sm'>Email</FormLabel>
                <Input
                  type='email'
                  name='contact.email'
                  {...register('contact.email', { required: 'Email is required' })}
                />
                <FormErrorMessage>{errors?.contact?.email?.message}</FormErrorMessage>
              </FormControl>

              {/* Shipping form */}
              <Heading size='md' fontWeight='bold' mt={8}>
                Shipping
              </Heading>
              <FormControl id='phone' mt={4} isInvalid={errors?.shipping?.firstName} isRequired>
                <FormLabel fontSize='sm'>First Name</FormLabel>
                <Input
                  type='text'
                  name='shipping.firstName'
                  {...register('shipping.firstName', { required: 'First name is required' })}
                />
                <FormErrorMessage>{errors?.shipping?.firstName?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id='email' mt={4} isInvalid={errors?.shipping?.lastName} isRequired>
                <FormLabel fontSize='sm'>Last Name</FormLabel>
                <Input
                  type='text'
                  name='shipping.lastName'
                  {...register('shipping.lastName', { required: 'Last name is required' })}
                />
                <FormErrorMessage>{errors?.shipping?.lastName?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id='phone' mt={4} isInvalid={errors?.shipping?.address_1} isRequired>
                <FormLabel fontSize='sm'>Address Line 1</FormLabel>
                <Input
                  type='text'
                  name='shipping.address_1'
                  {...register('shipping.address_1', { required: 'Address is required' })}
                />
                <FormErrorMessage>{errors?.shipping?.address_1?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id='email' mt={4}>
                <FormLabel fontSize='sm'>Address Line 2</FormLabel>
                <Input type='text' name='shipping.address_2' {...register('email')} />
              </FormControl>
              <FormControl id='phone' mt={4} isInvalid={errors?.shipping?.postcode} isRequired>
                <FormLabel fontSize='sm'>Postcode</FormLabel>
                <Input
                  type='text'
                  name='shipping.postcode'
                  {...register('shipping.postcode', { required: 'Postcode is required' })}
                />
                <FormErrorMessage>{errors?.shipping?.postcode?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id='email' mt={4} isInvalid={errors?.shipping?.city} isRequired>
                <FormLabel fontSize='sm'>City</FormLabel>
                <Input
                  type='text'
                  name='shipping.city'
                  {...register('shipping.city', { required: 'City is required' })}
                />
                <FormErrorMessage>{errors?.shipping?.city?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id='phone' mt={4} isInvalid={errors?.shipping?.state} isRequired>
                <FormLabel fontSize='sm'>State</FormLabel>
                <Select
                  placeholder='Select state'
                  name='shipping.state'
                  {...register('shipping.state', { required: 'State is required' })}
                >
                  {states.map((state) => (
                    <option key={state.code} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors?.shipping?.state?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
          </Flex>
          <Flex direction='column' py={4} px={2}>
            <Button
              type='submit'
              width='full'
              fontSize='sm'
              size='lg'
              variant='solid'
              color='white'
              backgroundColor='gray.900'
              _hover={{ bg: 'gray.700' }}
              _focus={{ bg: 'gray.700' }}
              _active={{ bg: 'gray.800' }}
              isLoading={loading}
            >
              Continue to Payment
            </Button>
          </Flex>
        </form>
      )}
    </Flex>
  )
}

export default CustomerCheckout
