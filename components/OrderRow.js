import NextLink from 'next/link'
import { ChevronRight } from 'react-feather'
import { format, parseISO } from 'date-fns'
import { Box, Flex, LinkBox, LinkOverlay, Spacer, Stack, Tag, Text } from '@chakra-ui/react'

function OrderRow({ id, name, amount, createdAt, status }) {
  const isPaid = status === 'paid'
  return (
    <LinkBox as={Flex} bg='white' borderBottom='1px' borderColor='gray.200' p={4} fontSize='sm'>
      <Stack direction='column' spacing='2'>
        <Text fontSize='xs' color='gray.600'>
          {format(parseISO(createdAt), 'dd/MM/yy')}
        </Text>
        <NextLink href={`/orders/${id}`} passHref>
          <LinkOverlay noOfLines='2'>{name}</LinkOverlay>
        </NextLink>
        <Box>
          <Tag size='sm' colorScheme={isPaid ? 'green' : 'orange'} textTransform='capitalize'>
            {status}
          </Tag>
        </Box>
      </Stack>
      <Spacer />
      <Flex alignItems='center'>
        <Text>{`RM${amount}`}</Text>
        <ChevronRight size='15' />
      </Flex>
    </LinkBox>
  )
}

export default OrderRow
