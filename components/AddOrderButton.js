import React from 'react'
import { nanoid } from 'nanoid'
import { useForm } from 'react-hook-form'
// import { mutate } from 'swr'
import {
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  useDisclosure,
  Button,
  Stack,
  useToast,
} from '@chakra-ui/react'

import { useAuth } from '@utils/auth'
import { createOrder } from '@utils/db'

function AddOrderButton({ children, ...props }) {
  const { user } = useAuth()
  const { handleSubmit, register, reset } = useForm()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const onSubmit = ({ name, description, amount }) => {
    // Create new order object
    const newOrder = {
      id: nanoid(13),
      name,
      description,
      amount: Number(amount),
      ownerId: user.uid,
      storeName: user.storeName,
      createdAt: new Date().toISOString(),
      status: 'pending',
    }

    // Save order to db
    createOrder(newOrder)

    // // Update UI with new order
    // mutate(
    //   ['/api/orders', user.token],
    //   async ({ orders }) => ({ orders: [{ ...newOrder }, ...orders] }),
    //   false,
    // )

    // Alert user with toast
    toast({
      title: 'Order created.',
      description: 'Payment link is copied to your clipboard.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

    // Close create order drawer
    onClose()
    reset()
  }

  return (
    <>
      <Button
        onClick={onOpen}
        variant='solid'
        color='white'
        backgroundColor='gray.900'
        _hover={{ bg: 'gray.700' }}
        _focus={{ bg: 'gray.700' }}
        _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
        {...props}
      >
        {children}
      </Button>
      <Drawer isOpen={isOpen} placement='bottom' onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>New order</DrawerHeader>

            <form as='form' onSubmit={handleSubmit(onSubmit)}>
              <DrawerBody>
                <FormControl mt={4}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder='Cake by Abu'
                    autoComplete='off'
                    name='name'
                    {...register('name')}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder={`Cake - RM10\nShipping - RM5`}
                    name='description'
                    autoComplete='off'
                    {...register('description')}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    type='number'
                    placeholder='15.00'
                    step='.01'
                    autoComplete='off'
                    name='amount'
                    {...register('amount')}
                  />
                </FormControl>
              </DrawerBody>

              <DrawerFooter>
                <Stack width='full'>
                  <Button
                    type='submit'
                    width='full'
                    variant='solid'
                    color='white'
                    backgroundColor='gray.900'
                    _hover={{ bg: 'gray.700' }}
                    _focus={{ bg: 'gray.700' }}
                    _active={{ bg: 'gray.800' }}
                  >
                    Create
                  </Button>
                  <Button width='full' variant='outline' onClick={onClose}>
                    Cancel
                  </Button>
                </Stack>
              </DrawerFooter>
            </form>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default AddOrderButton
