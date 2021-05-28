import React from 'react'
import { Text } from '@chakra-ui/layout'

import { useAuth } from '@utils/auth'
import HomeNonActiveState from '@components/HomeNonActiveState'
import HomeEmptyState from '@components/HomeEmptyState'

export default function Home() {
  const { user } = useAuth()
  const hasActivate = Boolean(user?.username)

  if (!user) return <Text>Loading...</Text>
  if (!hasActivate) return <HomeNonActiveState />

  return <HomeEmptyState />
}
