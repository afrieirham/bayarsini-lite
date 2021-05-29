import { auth } from '@lib/firebase-admin'
import { getUserPayments } from '@utils/db-admin'

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token)
    const { payments } = await getUserPayments(uid)
    return res.status(200).json({ payments })
  } catch (error) {
    res.status(500).json({ error })
  }
}
