import { compareDesc, parseISO } from 'date-fns'
import { db } from '@lib/firebase-admin'

export async function getUserOrders(uid) {
  const snapshot = await db.collection('orders').where('ownerId', '==', uid).get()

  const orders = []
  snapshot.forEach((doc) => {
    orders.push({ id: doc.id, ...doc.data() })
  })

  const sortedOrders = orders.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)),
  )

  return { orders: sortedOrders }
}

export async function getOrder(orderId, ownerId) {
  const doc = await db.collection('orders').doc(orderId).get()

  // Handle public request
  if (!ownerId) {
    const { customer: _, ...publicOrder } = { id: doc.id, ...doc.data() }
    return { order: publicOrder }
  }

  const order = { id: doc.id, ...doc.data() }
  return { order }
}

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
