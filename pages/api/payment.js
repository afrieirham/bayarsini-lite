import { savePayment } from '@utils/db-admin'

// Create payments record and return paymentId
export default async (req, res) => {
  try {
    const firebasePayment = await savePayment(req.body.payment)
    const paymentId = await (await firebasePayment.get()).id

    res.status(201).json({ paymentId })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
