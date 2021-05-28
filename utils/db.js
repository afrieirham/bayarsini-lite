import firebase from '@lib/firebase'

const firestore = firebase.firestore()
const app = firebase.app()

export async function getPaymentConfig(userId) {
  const doc = await firestore.collection('users').doc(userId).get()
  return { ...doc.data().toyyibpay }
}

export async function getFirestoreUser(userId) {
  const doc = await firestore.collection('users').doc(userId).get()
  const user = { id: doc.id, ...doc.data() }
  return user
}

export function saveUser(user) {
  return firestore.collection('users').doc(user.uid).set(user, { merge: true })
}

export function createOrder(order) {
  return firestore.collection('orders').doc(order.id).set(order, { merge: true })
}

export function updateOrder(orderId, newValues) {
  return firestore.collection('orders').doc(orderId).update(newValues)
}

export function updateUserProfile(userId, newValues) {
  return firestore.collection('users').doc(userId).update(newValues)
}

export function updateStore(userId, storeName) {
  return firestore.collection('users').doc(userId).update({ storeName })
}
