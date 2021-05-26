import React from 'react'
import { format, parseISO } from 'date-fns'
import { Tag } from '@chakra-ui/tag'
import { IconButton } from '@chakra-ui/button'
import { Flex, Heading, Stack, Text } from '@chakra-ui/layout'
import { Table, Tbody, Td, Tr } from '@chakra-ui/table'
import { Edit2 } from 'react-feather'
import { useAuth } from 'utils/auth'

function OrderDetailsCard({ name, description, amount, status, createdAt, paidAt, ownerId }) {
  const { user } = useAuth()
  const isOwner = user?.uid === ownerId

  return (
    <Flex direction='column' bg='white' p={4} border='1px' borderColor='gray.200'>
      <Flex justifyContent='space-between' alignItems='center'>
        <Stack spacing={4} isInline>
          <Heading size='md' fontWeight='bold'>
            Order Details
          </Heading>
          <Tag colorScheme={paidAt ? 'green' : 'orange'} size='sm' textTransform='capitalize'>
            {status}
          </Tag>
        </Stack>
        {isOwner && !paidAt && <IconButton icon={<Edit2 size='15' />} variant='ghost' />}
      </Flex>
      <Table variant='unstyled' size='sm' my={2} colorScheme='blackAlpha' borderBottom='none'>
        <Tbody>
          <Tr>
            <Td color='gray.500'>Total</Td>
            <Td width='65%'>{`RM${amount}`}</Td>
          </Tr>
          <Tr>
            <Td color='gray.500'>Name</Td>
            <Td>{name}</Td>
          </Tr>
          {description && (
            <Tr>
              <Td color='gray.500' verticalAlign='top'>
                Description
              </Td>
              <Td>
                <Text whiteSpace='pre-wrap'>{description}</Text>
              </Td>
            </Tr>
          )}
          <Tr>
            <Td color='gray.500'>Date</Td>
            <Td>{format(parseISO(createdAt), 'E, MMM d, h:mm a')}</Td>
          </Tr>
          {paidAt && (
            <Tr>
              <Td color='gray.500'>Paid on</Td>
              <Td>{format(parseISO(paidAt), 'E, MMM d, h:mm a')}</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default OrderDetailsCard
