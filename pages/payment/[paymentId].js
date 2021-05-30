import React from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'

import fetcher from '@utils/fetcher'
import Loader from '@components/Loader'
import PaymentFailed from '@components/PaymentFailed'
import PaymentSuccess from '@components/PaymentSuccess'

function Payment() {
  const router = useRouter()
  const { paymentId, status_id, billcode } = router.query
  const { data, error } = useSWR(paymentId ? `/api/payment/${paymentId}` : null, fetcher)

  if (!data) {
    return <Loader />
  }

  if (error) {
    return error.response?.data?.message || 'error'
  }

  if (status_id !== '1') {
    return <PaymentFailed billCode={billcode} />
  }

  return <PaymentSuccess {...data} />
}

export default Payment
