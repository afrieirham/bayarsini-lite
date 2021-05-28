import Cors from 'cors'
import micro from 'micro'
import formidable from 'formidable'

import { updateOrder } from '@utils/db'

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

  const data = await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({ keepExtensions: true })
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })

  const { status, order_id } = data.fields
  if (Number(status) === 1) {
    const paymentInfo = {
      status: 'paid',
      paidAt: new Date().toISOString(),
    }

    updateOrder(order_id, paymentInfo)
  }
  return res.status(204)
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default micro(checkout)
