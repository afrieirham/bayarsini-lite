import React from 'react'
import NextLink from 'next/link'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  Flex,
  IconButton,
  Text,
  useDisclosure,
  Avatar,
  Box,
  Stack,
  Divider,
} from '@chakra-ui/react'
import { Menu, Settings, ShoppingBag } from 'react-feather'

import { useAuth } from '@utils/auth'

function NavbarButton({ ...props }) {
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton variant='ghost' icon={<Menu />} onClick={onOpen} {...props} />
      <Drawer isOpen={isOpen} placement='left' onClose={onClose} size='xs'>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>Bayar Sini</DrawerHeader>
            <DrawerBody py={4}>
              <Divider mb={4} />
              <Flex direction='column'>
                <Flex alignItems='center'>
                  <Avatar src={user?.photoUrl} />
                  <Box ml={4}>
                    <Text fontWeight='semibold'>{user?.name}</Text>
                    <Text fontSize='xs' color='gray.600'>
                      {user?.email}
                    </Text>
                  </Box>
                </Flex>
                <Divider my={4} />
                <Stack direction='column' width='full' spacing={2}>
                  <NextLink href='/orders' passHref>
                    <Button
                      size='sm'
                      variant='ghost'
                      justifyContent='flex-start'
                      leftIcon={<ShoppingBag size='15' />}
                    >
                      Orders
                    </Button>
                  </NextLink>
                  <NextLink href='/settings' passHref>
                    <Button
                      size='sm'
                      variant='ghost'
                      justifyContent='flex-start'
                      leftIcon={<Settings size='15' />}
                    >
                      Settings
                    </Button>
                  </NextLink>
                </Stack>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default NavbarButton
