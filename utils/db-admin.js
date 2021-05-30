import { compareDesc, parseISO } from 'date-fns'
import { db } from '@lib/firebase-admin'

export async function getUserByUsername(username) {
  const query = await db.collection('users').where('username', '==', username).get()

  const snapshot = query.docs[0]
  const data = snapshot.data()

  const user = { id: data.uid, ...data }

  return { user }
}

export async function getAllUsers({ isActive }) {
  const snapshot = await db.collection('users').where('isActive', '==', isActive).get()

  const users = []
  snapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() })
  })

  const sortedUsers = users.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)),
  )

  return { users: sortedUsers }
}

export async function savePayment(payment) {
  const newPayment = db.collection('payments').doc()
  newPayment.set(payment)

  return newPayment
}

export function updatePayment(paymentId, newValues) {
  return db.collection('payments').doc(paymentId).update(newValues)
}

export async function getPayment(paymentId) {
  const doc = await db.collection('payments').doc(paymentId).get()
  const payment = { id: doc.id, ...doc.data() }
  return { payment }
}

export async function getUserPayments(uid) {
  const snapshot = await db
    .collection('payments')
    .where('receiverId', '==', uid)
    .where('status', '==', 1)
    .get()

  const payments = []
  snapshot.forEach((doc) => {
    payments.push({ id: doc.id, ...doc.data() })
  })

  const sortedPayments = payments.sort((a, b) =>
    compareDesc(parseISO(a.paidAt), parseISO(b.paidAt)),
  )

  return { payments: sortedPayments }
}
