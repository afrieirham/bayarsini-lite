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
