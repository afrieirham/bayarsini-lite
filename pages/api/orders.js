import { auth } from '@lib/firebase-admin'
import { getUserOrders } from '@utils/db-admin'

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token)
    const { orders } = await getUserOrders(uid)
    res.status(200).json({ orders })
  } catch (error) {
    res.status(500).json({ error })
  }
}
