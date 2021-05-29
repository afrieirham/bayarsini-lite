import Router from 'next/router'
import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from '@lib/firebase'
import { getFirestoreUser, saveUser } from './db'

// Create authContext
const authContext = createContext()

// Return the Auth provider with all the reuseable firebase auth function
export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// This will be imported in files that need auth stuff
// Create useAuth hook that return the authContext
export const useAuth = () => {
  return useContext(authContext)
}

// React hook to give reuseable firebase auth function
function useAuthProvider() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  // Set user in state if logged in
  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser)
      const { token, ...userForFirestore } = user

      // Save user info to db
      saveUser(userForFirestore)

      // Get extra user details to store in auth state
      const { username, isActive } = await getFirestoreUser(user.uid)

      setUser({ ...user, username, isActive })
      return user
    } else {
      setUser(false)
      return false
    }
  }

  const signInWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        Router.push('/home')
        handleUser(response.user)
      })
  }

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        Router.push('/')
        handleUser(false)
      })
  }

  // Watch the firebase auth state and update it accordingly
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      setAuthLoading(true)
      await handleUser(user)
      setAuthLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return {
    user,
    setUser,
    signOut,
    authLoading,
    signInWithGoogle,
  }
}

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token: user.za,
  }
}
