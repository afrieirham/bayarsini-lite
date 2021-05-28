import { getPayment, getUserByUsername } from '@utils/db-admin'

export default async (req, res) => {
  try {
    const { payment } = await getPayment(req.query.paymentId)
    const { user } = await getUserByUsername(payment.receiverUsername)
    return res.status(200).json({
      payment,
      receiver: {
        username: user.username,
        displayName: user.displayName ? user.displayName : user.name,
      },
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}
