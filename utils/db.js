import firebase from '@lib/firebase'

const firestore = firebase.firestore()

export async function getFirestoreUser(userId) {
  const doc = await firestore.collection('users').doc(userId).get()
  const user = { id: doc.id, ...doc.data() }
  return user
}

export async function checkIfUsernameAvailable(username) {
  const query = await firestore.collection('users').where('username', '==', username).get()
  return query.empty
}

export function saveUser(user) {
  return firestore.collection('users').doc(user.uid).set(user, { merge: true })
}
export function updateUserProfile(userId, newValues) {
  return firestore.collection('users').doc(userId).update(newValues)
}

export function updateStore(userId, storeName) {
  return firestore.collection('users').doc(userId).update({ storeName })
}
