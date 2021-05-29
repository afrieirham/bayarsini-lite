import React from 'react'
import useSWR from 'swr'

import { useAuth } from '@utils/auth'
import fetcher from '@utils/fetcher'
import HomeNonActiveState from '@components/HomeNonActiveState'
import HomeEmptyState from '@components/HomeEmptyState'
import PaymentHistory from '@components/PaymentHistory'

export default function Home() {
  const { user, authLoading } = useAuth()
  const { data, error } = useSWR(user ? ['/api/payments', user.token] : null, fetcher)

  if (!user && !authLoading) {
    return 'No logged in user'
  }

  if (error) {
    return 'error'
  }

  if (!data) {
    return 'Loading...'
  }

  if (!user.isActive) {
    return <HomeNonActiveState />
  }

  if (!data.payments.length) {
    return <HomeEmptyState />
  }

  return <PaymentHistory payments={data.payments} user={user} />
}
