import { useRouter } from 'next/router'
import useSWR from 'swr'

import fetcher from 'utils/fetcher'
import PublicShell from 'components/PublicShell'
import CustomerCheckout from 'components/CustomerCheckout'
import { useEffect } from 'react'
import { updateOrder } from '@utils/db'

function Checkout() {
  const router = useRouter()
  const orderId = router.query.orderId

  const { data, error, mutate } = useSWR(`/api/orders/${orderId}`, fetcher)

  useEffect(() => {
    const status = Number(router.query.status_id)
    const hasCustomerData = Boolean(data?.order?.contact && data?.order?.shipping)

    if (hasCustomerData && status === 1) {
      const paymentInfo = {
        status: 'paid',
        paidAt: new Date().toISOString(),
      }
      updateOrder(orderId, paymentInfo)
      mutate()
    }
  }, [router, data])

  if (!data) {
    return 'Loading...'
  }

  if (error) {
    return error.response?.data?.message || 'error'
  }

  return (
    <PublicShell title={data.order?.storeName || 'Bayar Sini'}>
      <CustomerCheckout order={data.order} />
    </PublicShell>
  )
}

export default Checkout
