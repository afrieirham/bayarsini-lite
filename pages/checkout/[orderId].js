import { useRouter } from 'next/router'
import useSWR from 'swr'

import fetcher from '@utils/fetcher'
import PublicShell from '@components/PublicShell'
import CustomerCheckout from '@components/CustomerCheckout'

function Checkout() {
  const router = useRouter()
  const orderId = router.query.orderId

  const { data, error } = useSWR(`/api/orders/${orderId}`, fetcher)

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
