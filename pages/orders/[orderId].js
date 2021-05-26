import { useRouter } from 'next/router'
import useSWR from 'swr'

import { useAuth } from 'utils/auth'
import fetcher from 'utils/fetcher'
import DashboardShell from 'components/DashboardShell'
import OwnerSingleOrder from 'components/OwnerSingleOrder'

export default function SingleOrder() {
  const router = useRouter()
  const orderId = router.query.orderId
  const { user } = useAuth()
  const { data, error } = useSWR(user ? [`/api/orders/${orderId}`, user.token] : null, fetcher)

  if (!data) {
    return 'Loading...'
  }

  if (error) {
    return error.response?.data?.message || 'error'
  }

  return (
    <DashboardShell title={`Order #${orderId}`}>
      <OwnerSingleOrder order={data.order} />
    </DashboardShell>
  )
}
