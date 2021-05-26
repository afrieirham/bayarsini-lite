import NextLink from 'next/link'
import { useClipboard } from '@chakra-ui/hooks'
import { Button } from '@chakra-ui/button'
import { Flex } from '@chakra-ui/layout'
import { ArrowLeft, Check, Copy } from 'react-feather'

import OrderDetailsCard from './OrderDetailsCard'
import CustomerDetailsCard from './CustomerDetailsCard'

function OwnerSingleOrder({ order }) {
  const { hasCopied, onCopy } = useClipboard(`${window.origin}/checkout/${order.id}`)

  return (
    <Flex direction='column' width='full'>
      <Flex px={4} py={8}>
        <NextLink href='/orders' passHref>
          <Button variant='link' color='black' leftIcon={<ArrowLeft size='15' />}>
            My Orders
          </Button>
        </NextLink>
      </Flex>
      <OrderDetailsCard {...order} />

      {order.status === 'paid' ? (
        <CustomerDetailsCard {...order} />
      ) : (
        <Flex bg='white' p={4} borderBottom='1px' borderColor='gray.200'>
          {hasCopied ? (
            <Button
              rightIcon={<Check size='15' />}
              width='full'
              fontSize='sm'
              variant='solid'
              colorScheme='green'
            >
              Copied
            </Button>
          ) : (
            <Button
              rightIcon={<Copy size='15' />}
              width='full'
              fontSize='sm'
              variant='solid'
              color='white'
              backgroundColor='gray.900'
              _hover={{ bg: 'gray.700' }}
              _focus={{ bg: 'gray.700' }}
              _active={{ bg: 'gray.800' }}
              onClick={onCopy}
            >
              Copy Payment Link
            </Button>
          )}
        </Flex>
      )}
    </Flex>
  )
}

export default OwnerSingleOrder
