import { auth } from '@lib/firebase-admin'
import { getOrder } from '@utils/db-admin'

export default async (req, res) => {
  const token = req.headers.token
  const hasToken = token !== 'undefined'
  try {
    // Owner request
    if (hasToken) {
      const { uid } = await auth.verifyIdToken(token)
      const { order } = await getOrder(req.query.orderId, uid)
      return res.status(200).json({ order })
    }

    // Public request
    const { order } = await getOrder(req.query.orderId, null)
    return res.status(200).json({ order })
  } catch (error) {
    res.status(500).json({ error })
  }
}
