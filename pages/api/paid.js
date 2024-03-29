import Cors from 'cors'
import { IncomingForm } from 'formidable'

import { updatePayment } from '@utils/db-admin'

// Initializing the cors middleware
const cors = Cors({ origin: process.env.NEXT_PUBLIC_TOYYIBPAY_BASE_URL })

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const checkout = async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors)

  const { fields } = await new Promise((resolve, reject) => {
    const form = new IncomingForm({ keepExtensions: true })

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })

  const { status, order_id } = fields

  // status: 1 = success, 2 = pending, 3 = fail
  if (Number(status) === 1) {
    const paymentInfo = {
      status: Number(status),
      paidAt: new Date().toISOString(),
    }

    updatePayment(order_id, paymentInfo)
  }
  if (Number(status) === 3) {
    const paymentInfo = {
      status: Number(status),
    }

    updatePayment(order_id, paymentInfo)
  }

  return res.status(204).send()
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default checkout
