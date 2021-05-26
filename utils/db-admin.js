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
