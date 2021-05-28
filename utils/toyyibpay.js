import axios from 'axios'

const toyyibPay = axios.create({ baseURL: process.env.NEXT_PUBLIC_TOYYIBPAY_BASE_URL })

export const createBill = async ({ receiver, payment }) => {
  const newBill = {
    // ToyyibPay config
    userSecretKey: receiver.toyyibpay.userSecretKey,
    categoryCode: receiver.toyyibpay.categoryCode,

    // Bill info
    billName: 'Payment from Bayar Sini',
    billDescription: `Payment for ${receiver.name} @${receiver.username}`,

    // For fixed amount bill, set it to 1 and insert bill amount. For dynamic bill (user can insert the amount to pay), set it to 0.
    billPriceSetting: 1,

    // If you want to create open bill without require payer information, set it to 0. If you need payer information, set it to 1
    billPayorInfo: 1,

    // RM1 = 100
    billAmount: payment.amount * 100,

    // Return page to show to customer
    billReturnUrl: `${window.location.origin}/payment/${payment.id}`,

    // API url to process payment info
    billCallbackUrl: `${window.location.origin}/api/paid`,

    // Set 0 for FPX, 1 Credit Card and 2 for both FPX & Credit Card.
    billPaymentChannel: 0,

    // Set 0 or 2 to charge FPX to customer || Set 1 or leave blank to charge FPX bill owner
    billChargeToCustomer: 1,

    // Attach firebase order id to ToyyibPay reference no
    billExternalReferenceNo: payment.id,

    // Customer info
    billTo: payment.customerName,
    billEmail: payment.customerEmail,
    billPhone: payment.customerPhone,
  }

  // Convert JSON to form data
  const billForm = new FormData()
  for (const key in newBill) {
    billForm.append(key, newBill[key])
  }

  const { data } = await toyyibPay.post('/api/createBill', billForm)

  return data[0].BillCode
}
