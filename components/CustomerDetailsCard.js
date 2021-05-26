import React from 'react'

import { Flex, Heading, Text } from '@chakra-ui/layout'
import { Table, Tbody, Td, Tr } from '@chakra-ui/table'

function CustomerDetailsCard({ contact, shipping }) {
  return (
    <Flex direction='column' mt={8}>
      <Text fontSize='xs' color='gray.500' textTransform='uppercase' px={4} mb={1}>
        Customer
      </Text>
      <Flex direction='column' bg='white' p={4} border='1px' borderColor='gray.200'>
        <Heading size='md' fontWeight='bold'>
          Contact
        </Heading>
        <Table variant='unstyled' size='sm' my={2} colorScheme='blackAlpha' borderBottom='none'>
          <Tbody>
            <Tr>
              <Td color='gray.500'>Phone</Td>
              <Td width='65%'>{contact.phone}</Td>
            </Tr>
            <Tr>
              <Td color='gray.500'>Email</Td>
              <Td>{contact.email}</Td>
            </Tr>
          </Tbody>
        </Table>
        <Heading size='md' fontWeight='bold' mt={8}>
          Shipping
        </Heading>
        <Table variant='unstyled' size='sm' my={2} colorScheme='blackAlpha' borderBottom='none'>
          <Tbody>
            <Tr>
              <Td color='gray.500'>Name</Td>
              <Td width='65%'>{`${shipping.firstName} ${shipping.lastName}`}</Td>
            </Tr>
            <Tr>
              <Td color='gray.500' verticalAlign='top'>
                Address
              </Td>
              <Td>
                <Text>{shipping.address_1}</Text>
                <Text>{shipping.address_2}</Text>
                <Text>{shipping.city}</Text>
                <Text>{`${shipping.postcode} ${shipping.state}`}</Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  )
}

export default CustomerDetailsCard
