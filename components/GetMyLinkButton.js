import React, { useEffect, useState } from 'react'
import { Button, useClipboard } from '@chakra-ui/react'
import { Check, Copy } from 'react-feather'

import { useAuth } from '@utils/auth'

function GetMyLinkButton() {
  const { user } = useAuth()
  const [origin, setOrigin] = useState('')
  const { hasCopied, onCopy } = useClipboard(`${origin}/${user?.username}`)

  useEffect(() => {
    setOrigin(window.origin)
  }, [window])

  if (hasCopied) {
    return (
      <Button
        mt={2}
        rightIcon={<Check size='15' />}
        width='full'
        size='lg'
        fontSize='sm'
        variant='solid'
        colorScheme='gray'
      >
        Copied
      </Button>
    )
  }

  return (
    <Button
      mt={2}
      rightIcon={<Copy size='15' />}
      width='full'
      size='lg'
      fontSize='sm'
      variant='solid'
      color='white'
      backgroundColor='gray.900'
      _hover={{ bg: 'gray.700' }}
      _focus={{ bg: 'gray.700' }}
      _active={{ bg: 'gray.800' }}
      onClick={onCopy}
    >
      Get Payment Link
    </Button>
  )
}

export default GetMyLinkButton
